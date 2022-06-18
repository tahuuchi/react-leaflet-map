import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function PageHome(): React.ReactElement {
    return (
        <div className="App">

            <div className='container'>
                <h1>Home page</h1>
                <Link to={'/map'} className='menu'>Map Page</Link>
                <Link to={'/polygon'} className='menu'>Polygon Page</Link>
            </div>
        </div>
    );
}

export default PageHome;
