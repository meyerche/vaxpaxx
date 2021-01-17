import React from "react";
import SearchDosesListItem from "./SearchDosesListItem";

class SearchDosesList extends React.Component {

    render() {
        const sites = this.props.sites;
        return (
            <div className="site-list">
                {sites.map((singleSite) =>
                    <SearchDosesListItem key={singleSite.geohash} site={singleSite} />
                )}
            </div>
        );
    }
}

export default SearchDosesList;
