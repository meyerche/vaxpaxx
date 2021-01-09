import React from "react";
import Site from "./Site";

class SiteList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const sites = this.props.sites;
        return (
            <div className="site-list">
                {sites.map((singleSite) =>
                    <Site key={singleSite.id} site={singleSite} />
                )}
            </div>
        );
    }
}

export default SiteList;
