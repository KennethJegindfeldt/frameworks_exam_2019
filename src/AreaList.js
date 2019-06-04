import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class AreaList extends Component {

    render() {
        let areaList = [];

        this.props.areaList.forEach((elm) => {
            areaList .push(
                <div class="job-div">
                    <li key={elm._id}>                    
                    <h3> <Link to={`/jobs/${elm._id}`}>{elm.area}</Link></h3>
                    <hr />
                    </li>
                </div>)
        });

        return (
            <div class="job-div-list">
                <h3>{this.props.header}</h3>
                <ul class="job-list-nav">
                    {areaList}
                </ul>
            </div>

        );
    }
}

export default AreaList;
