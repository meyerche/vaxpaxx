import React, {useEffect, useState} from "react";
import {Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid} from "@material-ui/core";
import SearchDosesMap from "./SearchDosesMap";
import SearchDosesList from "./SearchDosesList";
import SearchDosesForm from "./SearchDosesForm";
import Button from "@material-ui/core/Button";
//import Axios from "axios";
import firebase from "../../firebase.js";
import {distanceBetween, geohashQueryBounds} from "geofire-common";
import moment from "moment";


function SearchDoses(props) {
    //State parameters
    const [searchParams, setSearchParams] = useState({
        zipcode: 94024,
        distance: 10
    });
    const [searchCenter, setSearchCenter] = useState({
        lat: '',
        lng: ''
    });
    const [sites, setSites] = useState([]);

    const handleDoseSearch = (zip, dist, lat, lng) => {
        setSearchParams({
            zipcode: zip,
            distance: dist
        });
        setSearchCenter({
            lat: lat,
            lng: lng
        });
    }

    const handleClose = () => {
        props.hasSeenAlert();
    }

    useEffect(() => {
        const lat = searchCenter.lat;
        const lng = searchCenter.lng;

        if (lat && lng) {
            const searchCenter = [lat, lng];
            const searchRadius = searchParams.distance * 1609;   //convert miles to meters

            function getSiteList(center, radius) {
                //working off of firestore documentation:
                //https://firebase.google.com/docs/firestore/solutions/geoqueries

                // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
                // a separate query for each pair. There can be up to 9 pairs of bounds
                // depending on overlap, but in most cases there are 4.
                const db = firebase.firestore();
                const bounds = geohashQueryBounds(center, radius);
                const promises = [];
                for (const b of bounds) {
                    const q = db.collection('locations')
                        .orderBy('geohash')
                        .startAt(b[0])
                        .endAt(b[1]);

                    promises.push(q.get());
                }

                // Collect all the query results together into a single list
                Promise.all(promises).then((snapshots) => {
                    const matchingDocs = [];

                    for (const snap of snapshots) {
                        for (const doc of snap.docs) {
                            const lat = doc.get('lat');
                            const lng = doc.get('lng');

                            //only want results that have time after the current time
                            const expirationDate = new Date(doc.get('expiration').seconds * 1000) //milliseconds
                            const now = new Date();

                            // We have to filter out a few false positives due to GeoHash
                            // accuracy, but most will match
                            const distanceInKm = distanceBetween([lat, lng], center);
                            const distanceInM = distanceInKm * 1000;
                            if (distanceInM <= radius && expirationDate > now) {
                                matchingDocs.push(doc);
                            }
                        }
                    }

                    return matchingDocs;
                }).then((matchingDocs) => {
                    // Process the matching documents
                    // ...
                    let siteList = []
                    for (const doc of matchingDocs) {
                        let site = doc.data();
                        const date = new Date(site.expiration.seconds * 1000);  //convert to milliseconds
                        site.expiration = moment(date).format('h:mm A');
                        siteList.push(site);
                    }
                    return siteList;
                }).then((siteList) => {
                    setSites(siteList);
                });
            }

            getSiteList(searchCenter, searchRadius);
        }
    }, [searchCenter.lat, searchCenter.lng, searchParams.distance]);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                    <SearchDosesMap
                        sites={sites}
                        latitude={searchCenter.lat}
                        longitude={searchCenter.lng}
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <Container disableGutters>
                        <SearchDosesForm onDoseSearch={handleDoseSearch} />
                        <SearchDosesList sites={sites}/>
                    </Container>

                </Grid>
            </Grid>
            <Dialog
                open={props.showAlert === 'true'}
                onClose={handleClose}
                disableBackdropClick={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Warning!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        VaxPaxx does not guarantee the dose and location is up to date
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        I Understand
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SearchDoses;
