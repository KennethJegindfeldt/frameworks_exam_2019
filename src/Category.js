import React, {Component} from 'react';
import {Link} from "react-router-dom";


class Category extends Component {

   
    render() {
        let category = this.props.categories;
        
        console.log(this.props)
        if(!category) return (
        <div>
            Indlæser Job kategorier ...
        </div>)
     


        return (
            <div>
            <div class="job-div">
                <h3>{category.category}</h3>
                <b><Link to={'/'}>Gå til forsiden</Link></b>
            </div>          
            </div>
        );
    }
}

export default Category;

