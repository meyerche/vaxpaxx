import React from "react";
import "./App.css";
import MyMap from "./components/Map/MyMap";
import Header from "./components/Header";
import Home from "./components/Home";
import AddDoses from "./components/AddDoses";
import {Container} from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import data from "./assets/dummy-data.json";


class App extends React.Component {
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
                            <Route path={"/map"}><MyMap sites={data} /></Route>
                            <Route path={"/"}><Home /></Route>
                        </Switch>
                    </Container>
                </div>
            </Router>


          {/*/!*<div className="flex-container wrapper">*!/*/}
          {/*    <section className="page-content">*/}
          {/*        /!*<MyMap />*!/*/}
          {/*        */}
          {/*    </section>*/}
          {/*/!*</div>*!/*/}
        </div>
    );
  }
}
export default App;
