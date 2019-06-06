import React, {Component} from 'react';

class Job extends Component {

   
    render() {
        let job = this.props.jobs;
        
        console.log(this.props)
        if(!job) return (
        <div>
            Indlæser det valgte job ...
        </div>)
     
        return (
            <div>
            <div class="job-div">
                <h1>{job.jobtitle}</h1>
                <b>Område:</b> <p>{job.jobarea}</p>
                <b>Kategori:</b><p>{job.jobcategory}</p>
                <b>Virksomhed:</b><p>{job.company}</p>
                <b>Kontakt:</b><p><a href='mailto'>{job.email}</a></p>
                <b>Jobbeskrivelse:</b><p>{job.description}</p>
            </div>  
            
            <div class="back-to-front">
                    <button>
                        <a href="/">Tilbage til forsiden</a>
                    </button>
                </div>        
            </div>
        );
    }
}

export default Job;

