import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Button, Container, FormHelperText, Snackbar} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import {useFormik} from "formik";
import firebase from "../firebase.js";
import firebaseService from "../services/firebaseService";
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

    const displaySnackbar = (msg, severity) => {
        setSeverity(severity);
        setMsgOpen(true);
        setMsgText(msg);

        if (severity === "success")
            formik.resetForm();
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
            await firebaseService.findLocInDb(values.address)
                .then(res => {
                    if (res.found) {
                        //address already exists in our database so update the record
                        db.collection('locations').doc(res.id)
                            .update({
                                name: values.storeName,
                                expiration: new Date(expTime),
                                doses: values.dosesAvailable
                            })
                            .then(() => {
                                displaySnackbar(
                                    "Success!  Expiring doses have been updated.",
                                    "success"
                                );
                            })
                            .catch(error => {
                                displaySnackbar(
                                    "Error updating doses.",
                                    "error"
                                );
                            });
                    }
                    else {
                        //address does not exist in our database so create geolocation with nominatim service
                        const geoloc = firebaseService.findLoc(values.address)
                            .catch(error => {
                                displaySnackbar(
                                    "Error finding address",
                                    "error"
                                );
                            });

                        //geohash for retrieving addresses by distance
                        const hash = geohashForLocation([geoloc.lat, geoloc.lng]);

                        //add new document to firebase after geolocating address
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
                                displaySnackbar(
                                    "Success!  Vaccine site and expiring doses have been added.",
                                    "success"
                                );
                            });
                    }
                })
                .catch(error => {
                    displaySnackbar(
                        "An error has occurred while finding the address",
                        "error"
                    );
                    return {found: false, id: "error"};
                });
        }
    });

    return (
        <Container maxWidth={"sm"}>
            <form className={classes.root} onSubmit={formik.handleSubmit}>
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
