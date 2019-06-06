import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class CategoryList extends Component {

    render() {
        let categoryList = [];

        this.props.categoryList.forEach((elm) => {
            categoryList.push(
                <div class="job-div">
                    <li key={elm._id}>
                    <h3><Link to={`/area/${elm.category}`}>{elm.category}</Link></h3>
                    <hr />
                    </li>
                </div>)
        });

        return (
            <div class="job-div-list">
                <h1>Arbejdsområder</h1>
                <h3>{this.props.header}</h3>
                <ul class="job-list-nav">
                    {categoryList}
                </ul>
            </div>

        );
    }
}

export default CategoryList;
