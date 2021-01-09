import React from "react";
import {Grid} from "@material-ui/core";
import SiteMap from "./SiteMap";
import SiteList from "./SiteList";

function MyMap(props) {
    return (
        <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
                <SiteMap sites={props.sites} />
            </Grid>
            <Grid item md={6} xs={12}>
                <SiteList sites={props.sites} />
            </Grid>
        </Grid>
    )
}
export default MyMap;
