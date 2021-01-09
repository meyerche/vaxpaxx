import React from "react";
import {Button, Grid} from "@material-ui/core";
import { Link } from "react-router-dom";

function Home() {
    return (
        <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="center"
            spacing={3}
        >
            <Grid item>
                <Button variant="contained" size="large" color="secondary" >
                    <Link to={"/pharma"}>Pharmacist</Link>
                </Button>
            </Grid>
            <Grid item>
                <Button variant="contained" size="large" color="secondary" >
                    <Link to={"/map"}>Patient</Link>
                </Button>
            </Grid>
        </Grid>
    );
}

export default Home;
