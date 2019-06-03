import React, {Component} from 'react';
import {Link} from "react-router-dom";


class Area extends Component {

   
    render() {
        let area = this.props.areas;
        
        console.log(this.props)
        if(!area) return (
        <div>
            Indlæser jobs ...
        </div>)
     


        return (
            <div>
            <div class="job-div">
                <h3>{area.area}</h3>
                <b><Link to={'/'}>Gå til forsiden</Link></b>
            </div>          
            </div>
        );
    }
}

export default Area;

