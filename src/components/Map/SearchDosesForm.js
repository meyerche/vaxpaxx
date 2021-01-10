import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import "./SearchDosesForm.css"

class SearchDosesForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }

    handleSearchSubmit(event) {
        event.preventDefault();
        const zip = event.target.elements.txtLocation.value;
        const dist = event.target.elements.selDistance.value;
        this.props.onDoseSearch(zip, dist);
    }


    render() {
        return (
            <div className="searchContainer">
                <form onSubmit={this.handleSearchSubmit}>
                    <TextField
                        id="txtLocation"
                        label="Zip Code"
                        variant="outlined"
                        type="number"
                        size="small"
                        name="txtLocation"
                        InputLabelProps={{ shrink: true }}
                        className="txtLocation"
                    />
                    <TextField
                        id="selDistance"
                        select
                        label="Distance"
                        variant="outlined"
                        size="small"
                        name="selDistance"
                        InputLabelProps={{ shrink: true }}
                        className="selDistance"
                        defaultValue={10}
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
}

export default SearchDosesForm;
