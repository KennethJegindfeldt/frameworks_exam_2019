import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class JobList extends Component {

    render() {
        let jobListen = this.props.jobList;
        let sortlist = jobListen.filter ((elm => {
            let category = this.props.match.params.category === elm.jobcategory
            return (category)
   
        }))

       /* let arealisten = this.props.areaList;
                let arealist = arealisten.filter ((elm => {
                let area = this.props.match.params.area === elm.jobarea
                return(area)
        }))

        */



        
        console.log(this.props.match.params.category)        
        let liste = [];

        sortlist.forEach((elm) => {
            liste .push(
                <div class="job-div">
                    <li key={elm._id}>
                        <h3>{elm.jobtitle}</h3>
                        <b>Område:</b><p>{elm.jobarea}</p>
                        <b>Kategori:</b><p>{elm.jobcategory}</p>
                        <b>Virksomhed:</b><p>{elm.company}</p>
                        <b>Email:</b><p><a href='#'>{elm.email}</a></p>
                        <b>Jobbeskrivelse:</b><p>{elm.description}</p>
                    <Link to={`${elm.category}/${elm._id}`}>Læs mere om jobbet her</Link>
                    <hr />
                    </li>
                </div>)
        });

        return (
            <div class="job-div-list">
                <h3>{this.props.header}</h3>
                <ul class="job-list-nav">
                    {liste}
                </ul>

                <div class="back-to-front">
                    <button>
                        <a href="/">Tilbage til forsiden</a>
                    </button>
                </div>
                
            </div>

        );
    }
}

export default JobList;
