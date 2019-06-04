import React, {Component} from 'react';
import {Link} from "react-router-dom";


class Job extends Component {

   
    render() {
        let job = this.props.jobs;
        
        console.log(this.props)
        if(!job) return (
        <div>
            Indlæser jobs ...
        </div>)
     


        return (
            <div>
            <div class="job-div">
                <h3>{job.jobtitle}</h3>
                <b>Område:</b> <p>{job.jobarea}</p>
                <b>Kategori:</b><p>{job.jobcategory}</p>
                <b>Jobbeskrivelse:</b><p>{job.description}</p>
                <b>Kontakt:</b><p>{job.email}</p>
                <b>Virksomhed:</b><p>{job.company}</p>
                <b><Link to={'/'}>Gå til forsiden</Link></b>
            </div>          
            </div>
        );
    }
}

export default Job;

