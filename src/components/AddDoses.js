import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Button, Container, FormHelperText, Snackbar} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import {useFormik} from "formik";
import firebase from "../firebase.js";
import axios from "axios";
import {geohashForLocation} from "geofire-common";
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
    },
    formFieldContainer: {
        display: 'flex',
    },
    helperText: {
        alignSelf: 'center',
        paddingLeft: theme.spacing(2),
        maxWidth: '50%'
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function handleBlur(addr) {
    console.log("blur", addr);
}

// async function findLocInDb(addr) {
//     const db = firebase.firestore();
//     db.collection('locations').where('address', '==', addr)
//         .get()
//         .limit(1)
//         .then(function(doc) {
//             if (doc.exists) {
//                 return doc.id;
//             }
//             else {
//                 return null;
//             }
//         })
//         .catch(
//
//         );
// }

async function findLoc(addr) {
    console.log("searching nominatim....");
    const res = await axios.get(
        `https://nominatim.openstreetmap.org/search/${addr}?format=json&addressdetails=1&limit=1`)

    const id = await res.data[0].osm_id;
    const lat = await Number(res.data[0].lat);
    const lng = await Number(res.data[0].lon);

    return {id, lat, lng};
}

function AddDoses() {
    const [msgOpen, setMsgOpen] = useState(false);
    const [msgText, setMsgText] = useState("Success!  Vaccine site and expiring doses have been added.");
    const [severity, setSeverity] = useState("success");
    const classes = useStyles();

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setMsgOpen(false);
    };

    async function findLocInDb(addr) {
        console.log('finding location in db ...')

        const db = firebase.firestore();
        return await db.collection("locations").where("address", "==", addr).limit(1)
            .get()
            .then(function (querySnapshot) {
                let foundLoc = {}
                querySnapshot.forEach(function (doc) {
                    console.log(doc);
                    console.log("doc exists: ", doc.exists, doc.id)
                    let ret = {};
                    if (doc.exists) {
                        foundLoc.found = true;
                        foundLoc.id = doc.id;
                        console.log("found in db: ", ret);
                    } else {
                        foundLoc.found = false;
                        foundLoc.id = "not found";
                    }
                });

                return foundLoc;
            })
            .catch(err => {
                setMsgOpen(true);
                setMsgText("An error has occurred while finding the address");
                setSeverity("error");
                return {found: false, id: "error"};
            });
    }

    const formik = useFormik({
        initialValues: {
            storeName: "",
            address: "",
            expiration: "",
            dosesAvailable: 0
        },
        async onSubmit(values) {
            // This will run when the form is submitted

            //set date to today at the time submitted in the form
            let expTime = new Date();
            expTime.setHours(values.expiration.split(":")[0], values.expiration.split(":")[1], 0, 0);

            //check db for address
            const db = firebase.firestore();
            await findLocInDb(values.address)
                .then(res => {
                    console.log("locId response:  ", res);
                    if (res.found) {      //address already exists in our database
                        db.collection('locations').doc(res.id)
                            .update({
                                name: values.storeName,
                                expiration: new Date(expTime),
                                doses: values.dosesAvailable
                            })
                            .then(() => {
                                setSeverity("success");
                                setMsgOpen(true);
                                setMsgText("Success!  Expiring doses have been updated.")
                            })
                            .catch(error => {
                                setSeverity("error");
                                setMsgOpen(true);
                                setMsgText("Error updating doses.")
                            })
                    } else {        //address does not exist in our database so create geolocation with nominatim service
                        console.log("in else clause:  ", res);
                        const geoloc = findLoc(values.address)
                            .catch(err => {
                                console.log(err);
                                alert('Error when searching Nominatim');
                            });

                        const hash = geohashForLocation([geoloc.lat, geoloc.lng]);


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

            //if there...update with new doses
            //if not there...find geolocation and then add





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
                <div className={classes.formFieldContainer}>
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
                    <FormHelperText className={classes.helperText} component={"div"}>
                        Enter the time your location closes and you will be throwing the vaccine out.
                    </FormHelperText>
                </div>
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
            <Snackbar open={msgOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity={severity}>
                    {msgText}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default AddDoses;
