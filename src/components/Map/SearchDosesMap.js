import React from "react";
import {MapContainer, TileLayer, Marker, Popup, LayerGroup} from "react-leaflet";
import Leaflet from "leaflet"
//import Axios from "axios";

class SearchDosesMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {lat: '', lng: ''}
    }

    render() {
        const lat = this.props.latitude;
        const lng = this.props.longitude;
        const zoom = 12;

        if (lat === '' || lng === '')
            return null;

        const position = [lat, lng];
        Leaflet.Icon.Default.imagePath = "img/";

        const sites = this.props.sites;
        let siteList = [];
        if (sites && sites.length > 0) {
            siteList = sites.map((site) =>
                <Marker key={site.geohash} position={[site.lat, site.lng]} >
                    <Popup>
                        <h3>{site.name}</h3>
                        Number of doses: {site.doses}<br />
                        Doses expire: {site.expire}
                    </Popup>
                </Marker>
            );
        }


        return (
            <MapContainer center={position} zoom={zoom}>
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

export default SearchDosesMap;
