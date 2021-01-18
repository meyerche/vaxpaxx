import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import "./SearchDosesForm.css"
import { useFormik } from "formik";
import Axios from "axios";

function SearchDosesForm(props) {
    const formik = useFormik({
        initialValues: {
            txtZip: '',
            selDistance: 10,
        },
        onSubmit(values) {
            // This will run when the form is submitted
            Axios.get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${values.txtZip}`)
                .then(res => {
                    const lat = res.data.records[0].fields.latitude;
                    const lng = res.data.records[0].fields.longitude;
                    props.onDoseSearch(values.txtZip, values.selDistance, lat, lng);
                })
                .catch(err => {
                    console.log(err);
                    alert("Zip code was not valid.");
                });
        }
    });

    return (
        <div className="searchContainer">
            <form onSubmit={formik.handleSubmit} noValidate>
                <TextField
                    id="txtZip"
                    name="txtZip"
                    label="Zip Code"
                    className="txtZip"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{shrink: true}}
                    value={formik.values.txtZip}
                    onChange={formik.handleChange}
                />
                <TextField
                    select
                    id="selDistance"
                    name="selDistance"
                    label="Distance"
                    className="selDistance"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{shrink: true}}
                    value={formik.values.selDistance}
                    onChange={formik.handleChange}
                >
                    <MenuItem key={"5"} value={5}>5 Miles</MenuItem>
                    <MenuItem key={"10"} value={10}>10 Miles</MenuItem>
                    <MenuItem key={"20"} value={20}>20 Miles</MenuItem>
                    <MenuItem key={"50"} value={50}>50 Miles</MenuItem>
                </TextField>
                <Button
                    variant="contained"
                    size="medium"
                    type="submit"
                    className="btnSubmit"
                >
                    Go
                </Button>
            </form>
        </div>
    );
}

export default SearchDosesForm;
