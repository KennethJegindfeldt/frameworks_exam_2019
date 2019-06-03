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
                <h2>{job.jobtitle}</h2>
                <p>{job.category}</p>
                <p>{job.area}</p>
                <p>{job.description}</p>
                <b><Link to={'/'}>Gå til forsiden</Link></b>
            </div>          
            </div>
        );
    }
}

export default Job;

