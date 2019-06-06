import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class AreaList extends Component {

    render() {
        let jobs = [];
        let cat = this.props.category;
        let area = this.props.area;
        let job = this.props.jobs;
        let array = job.filter((elm) => elm.jobcategory === cat && elm.jobarea === area)

        array.forEach((elm) => {
            jobs.push(
                <div class="job-div">
                    <li key={elm._id}>                    
                    <h3> <Link to={`/jobs/${elm._id}`}>{elm.jobtitle}</Link></h3>
                    <hr />
                    </li>
                </div>)
        });

        return (
            <div class="job-div-list">
                <h3>{this.props.header}</h3>
                <ul class="job-list-nav">
                    <h1>Alle - {cat} jobs på/i {area}</h1>
                    {jobs}
                </ul>
            </div>

        );
    }
}

export default AreaList;
