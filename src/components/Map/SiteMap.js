import React from "react";
import {MapContainer, TileLayer, Marker, Popup, LayerGroup} from "react-leaflet";
import Leaflet from "leaflet"

class SiteMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 37.33218338957494,
            lng: -122.03080444284289,
            zoom: 12
        };
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        Leaflet.Icon.Default.imagePath = "img/";

        const sites = this.props.sites;
        const siteList = sites.map((site) =>
            <Marker key={site.id} position={[site.lat, site.lng]} >
                <Popup>
                    <h3>{site.name}</h3>
                    Number of doses: {site.doses}<br />
                    Doses expire: {site.expire}
                </Popup>
            </Marker>
        );

        return (
            <MapContainer center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LayerGroup>
                    {siteList}
                </LayerGroup>
            </MapContainer>
        );
    }
}

export default SiteMap;
