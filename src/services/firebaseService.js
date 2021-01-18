import firebase from "../firebase";
import axios from "axios";
import {geohashForLocation} from "geofire-common";

export default class FirebaseService {

     static async findLoc(addr) {
        const res = await axios.get(
            `https://nominatim.openstreetmap.org/search/${addr}?format=json&addressdetails=1&limit=1`)

        const lat = await Number(res.data[0].lat);
        const lng = await Number(res.data[0].lon);

        console.log("findLoc:  ", lat, lng);
        return {lat, lng};
    }

    static async findLocInDb(addr) {
        const db = firebase.firestore();

        return await db.collection("locations").where("address", "==", addr).limit(1)
            .get()
            .then(function (querySnapshot) {
                let foundLoc = {}
                querySnapshot.forEach(function (doc) {
                    if (doc.exists) {
                        foundLoc.found = true;
                        foundLoc.id = doc.id;
                    } else {
                        foundLoc.found = false;
                        foundLoc.id = "not found";
                    }
                });

                return foundLoc;
            });
    }

    static async addNewLocation(values) {
        const db = firebase.firestore();

        //set date to today at the time submitted in the form
        // let expTime = new Date();
        // expTime.setHours(values.expiration.split(":")[0], values.expiration.split(":")[1], 0, 0);

        //geolocate with nominatim
        const geoloc = await this.findLoc(values.address);

        await console.log(geoloc);
        //geohash for retrieving addresses by distance
        const hash = await geohashForLocation([geoloc.lat, geoloc.lng]);

        //add new document to firebase after geolocating address
        return await db.collection("locations").add({
                address: values.address,
                name: values.storeName,
                lat: geoloc.lat,
                lng: geoloc.lng,
                geohash: hash,
                expiration: new Date(values.expiration),
                doses: values.dosesAvailable
            })
            .then(() => {
                return {success: true};
            })
            .catch(() => {
                return {success: false};
            });
            // .then((res) => {
            //     displaySnackbar(
            //         "Success!  Vaccine site and expiring doses have been added.",
            //         "success"
            //     );
            // });
    }

}
