import React from "react";
import { Marker, Popup } from "react-leaflet";

export default function MapMarkers(props) {
    const sites = props.sites;

    const siteList = sites.map((site) =>
        <Marker key={site.geohash} position={[site.lat, site.lng]}>
            <Popup>
                <h3>{site.name}</h3>
                Number of doses: {site.doses}<br/>
                Doses expire: {site.expire}
            </Popup>
        </Marker>
    );

    return (
        <React.Fragment>
            {siteList}
        </React.Fragment>
    )
}
