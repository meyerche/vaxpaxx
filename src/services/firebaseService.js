import firebase from "../firebase";
import axios from "axios";

export default class FirebaseService {

     static async findLoc(addr) {
        const res = await axios.get(
            `https://nominatim.openstreetmap.org/search/${addr}?format=json&addressdetails=1&limit=1`)

        const lat = await Number(res.data[0].lat);
        const lng = await Number(res.data[0].lon);

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
}
