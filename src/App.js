import React from "react";
import "./App.css";
import SearchDoses from "./components/Map/SearchDoses";
import Header from "./components/Header";
import Home from "./components/Home";
import AddDoses from "./components/AddDoses";
import {Container} from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
//import data from "./assets/dummy-data.json";


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            siteList: [],
            showAlert: "true"
        };

        this.setSiteList = this.setSiteList.bind(this);
        this.hasSeenAlert = this.hasSeenAlert.bind(this);
    }

    setSiteList(sites) {
        this.setState({siteList: sites})
    }

    hasSeenAlert() {
        this.setState({showAlert: 'false'});
    }

    render() {
        return (
            <div role="main" className="main-content">
                <Router>
                    <Header />
                    <div className={"page-content"}>
                        <Container>
                            <Switch>
                                <Route path={"/pharma"}><AddDoses /></Route>
                                <Route path={"/home"}><Home /></Route>
                                <Route path={"/map"}>
                                    <SearchDoses
                                        sites={this.state.siteList}
                                        getSites={this.setSiteList}
                                        showAlert={this.state.showAlert}
                                        hasSeenAlert={this.hasSeenAlert}
                                    />
                                </Route>
                                <Route path={"/"}><Home /></Route>
                            </Switch>
                        </Container>
                    </div>
                </Router>
            </div>
        );
    }
}
export default App;
