import React from "react";
import {LayerGroup, MapContainer, TileLayer} from "react-leaflet";
import Leaflet from "leaflet"
import MapMarkers from "./MapMarkers";

function SearchDosesMap(props) {
    const lat = props.latitude;
    const lng = props.longitude;
    const position = [lat, lng];
    const zoom = 12;

    if (lat === '' || lng === '')
        return null;

    Leaflet.Icon.Default.imagePath = "img/";

    return (
        <MapContainer key={position} center={position} zoom={zoom}>
            <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayerGroup>
                <MapMarkers sites={props.sites} />
            </LayerGroup>
        </MapContainer>
    );
}

export default SearchDosesMap;
