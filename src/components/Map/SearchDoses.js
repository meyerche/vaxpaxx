import React from "react";
import {Container, Grid} from "@material-ui/core";
import SearchDosesMap from "./SearchDosesMap";
import SearchDosesList from "./SearchDosesList";
import SearchDosesForm from "./SearchDosesForm";

class SearchDoses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zipCode:94024,   //default cupertino, CA
            distance:10,  //default 10 miles
            coordinates: {
                latitude: '',
                longitude: ''
            }
        }

        this.handleDoseSearch = this.handleDoseSearch.bind(this);
    }

    handleDoseSearch(zip, dist) {
        this.setState({zipCode: zip, distance: dist});
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                    <SearchDosesMap key={this.state.zipCode} sites={this.props.sites} zipCode={this.state.zipCode} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <Container disableGutters>
                        <SearchDosesForm onDoseSearch={this.handleDoseSearch} />
                        <SearchDosesList sites={this.props.sites}/>
                    </Container>

                </Grid>
            </Grid>
        )
    }
}

export default SearchDoses;
