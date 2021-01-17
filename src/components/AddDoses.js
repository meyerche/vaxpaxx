import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Container } from "@material-ui/core";
import { useFormik } from "formik";
import firebase from "../firebase.js";
import axios from "axios";
import { geohashForLocation } from "geofire-common";
//import MomentUtils from "@date-io/moment";
//import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    textField: {
        //marginLeft: theme.spacing(1),
        //marginRight: theme.spacing(1),
        width: '20ch',
    },
    button: {
        marginTop: theme.spacing(3)
    }
}));

function handleBlur(addr) {
    console.log("blur", addr);
}

async function findLoc(addr) {
    const res = await axios.get(
        `https://nominatim.openstreetmap.org/search/${addr}?format=json&addressdetails=1&limit=1`)

    const id = await res.data[0].osm_id;
    const lat = await Number(res.data[0].lat);
    const lng = await Number(res.data[0].lon);

    return {id, lat, lng};
}

function AddDoses() {
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            storeName: "",
            address: "",
            expiration: "",
            dosesAvailable: 0
        },
        async onSubmit(values) {
            // This will run when the form is submitted
            const geoloc = await findLoc(values.address)
                .catch(err => {
                    console.log(err);
                    alert('Error when searching Nominatim');
                });

            const hash = geohashForLocation([geoloc.lat, geoloc.lng]);
            var expTime = new Date();
            expTime.setHours(values.expiration.split(":")[0], values.expiration.split(":")[1], 0, 0);

            const db = firebase.firestore();
            db.collection("locations").add({
                address: values.address,
                name: values.storeName,
                lat: geoloc.lat,
                lng: geoloc.lng,
                geohash: hash,
                expiration: new Date(expTime),
                doses: values.dosesAvailable
            })
            .then((res) => {
                alert('Success!  Vaccine site and expiring doses have been added.');
            });
        }
    });

    return (
        <Container maxWidth={"sm"}>
            <form className={classes.root} onSubmit={formik.handleSubmit} noValidate>
                <TextField
                    id="storeName"
                    name="storeName"
                    label="Location Name"
                    placeholder="e.g. Walgreens, CVS, or St Mary's Memorial Hospital"
                    variant="outlined"
                    margin={"normal"}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formik.values.storeName}
                    onChange={formik.handleChange}
                />
                <TextField
                    id="address"
                    name="address"
                    label="Address"
                    variant="outlined"
                    margin={"normal"}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={e => {
                        formik.handleBlur(e);
                        handleBlur(e.target.value);
                    }}
                />
                <TextField
                    id="expiration"
                    name="expiration"
                    type="time"
                    label="Expiration Time"
                    variant="outlined"
                    margin={"normal"}
                    className={classes.textField}
                    InputLabelProps={{ shrink: true }}
                    value={formik.values.expiration}
                    onChange={formik.handleChange}
                />
                <TextField
                    id="dosesAvailable"
                    name="dosesAvailable"
                    label="Doses Available"
                    variant="outlined"
                    className={classes.textField}
                    type={"number"}
                    margin={"normal"}
                    InputLabelProps={{ shrink: true }}
                    value={formik.values.dosesAvailable}
                    onChange={formik.handleChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size={"large"}
                    className={classes.button}
                    type="submit"
                >
                    Add Doses
                </Button>
            </form>
        </Container>
    );
}

export default AddDoses;
