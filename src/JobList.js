import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class JobList extends Component {

    render() {
        let jobList = [];

        this.props.jobList.forEach((elm) => {
            jobList .push(
                <div class="job-div">
                    <li key={elm._id}>
                        <h3>{elm.jobtitle}</h3>
                        <b>Område:</b><p>{elm.jobarea}</p>
                        <b>Kategori:</b><p>{elm.jobcategory}</p>
                        <b>Virksomhed:</b><p>{elm.company}</p>
                        <b>Email:</b><p><a href='#'>{elm.email}</a></p>
                        <b>Jobbeskrivelse:</b><p>{elm.description}</p>
                    <Link to={`jobs/${elm._id}`}>Læs mere om jobbet her</Link>
                    <hr />
                    </li>
                </div>)
        });

        return (
            <div class="job-div-list">
                <h3>{this.props.header}</h3>
                <ul class="job-list-nav">
                    {jobList}
                </ul>
            </div>

        );
    }
}

export default JobList;
