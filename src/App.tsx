import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import PageHome from './Home';
import PageMap from './Map';
import PagePolygon from './Polygon';

function AppPage() {
  return (
    <div className="App">
      <div className='container'>
        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="/map" element={<PageMap />} />
          <Route path="/polygon" element={<PagePolygon />} />
        </Routes>

      </div>
    </div>
  );
}

export default AppPage;
