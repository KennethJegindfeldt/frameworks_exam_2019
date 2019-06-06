import React from 'react';
import {render, fireEvent} from 'react-testing-library';
import Result from './Result';
import {BrowserRouter as Router} from "react-router-dom";


it('renders App with header text', () => {
    const comp =
        <Router>
            <Result jobs={questionsTestData}/>
        </Router>;
    const {getByText} = render(comp);
    expect(getByText('Head of SEO')).toBeInTheDocument();

});
