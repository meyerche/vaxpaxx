import React from "react";
import {Button, Container, Grid} from "@material-ui/core";
import { Link } from "react-router-dom";
import HomeAbout from "./HomeAbout";
import "./Home.css";

function Home() {
    return (
        <Container disableGutters>
            <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="center"
                spacing={3}
            >
                <Grid item>
                    <Button variant="contained" size="large" color="secondary" >
                        <Link to={"/pharma"}>I'm a Pharmacist</Link>
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" size="large" color="secondary" >
                        <Link to={"/map"}>I'm looking to get vaccinated</Link>
                    </Button>
                </Grid>
            </Grid>

            <Container className="aboutContainer">
                <HomeAbout />
            </Container>
        </Container>

    );
}

export default Home;
