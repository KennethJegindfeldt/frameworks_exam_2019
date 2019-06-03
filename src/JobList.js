import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class JobList extends Component {

    render() {
        let jobList = [];

        this.props.qas.forEach((elm) => {
            jobList.push(
                <div class="job-div">
                    <li key={elm._id}>
                        <h3>{elm.jobtitle}</h3>
                        <p>{elm.category}</p>
                        <p>{elm.area}</p>
                        <p>{elm.description}</p>
                    <Link to={`/jobs/${elm._id}`}>Se job</Link>
                    </li>
                </div>)
        });

        return (
            <div class="job-div-list">
                <h3>{this.props.header}</h3>
                <ul>
                    {jobList}
                </ul>
            </div>

        );
    }
}

export default JobList;
