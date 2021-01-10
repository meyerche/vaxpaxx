import React from "react";
import {MapContainer, TileLayer, Marker, Popup, LayerGroup} from "react-leaflet";
import Leaflet from "leaflet"
import Axios from "axios";

class SearchDosesMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {lat: '', lng: ''}
    }

    componentDidMount() {
        const zip = this.props.zipCode;
        Axios.get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${zip}`)
            .then(res => {
                const lat = res.data.records[0].fields.latitude;
                const lng = res.data.records[0].fields.longitude;
                this.setState( {lat: lat, lng: lng});
            })
            .catch(err => {
                console.log(err);
                alert("Zip code was not valid.");
            });
    }

    render() {
        const lat = this.state.lat;
        const lng = this.state.lng
        const zoom = 12;

        if (lat === '' || lng === '')
            return null;

        const position = [lat, lng];
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
