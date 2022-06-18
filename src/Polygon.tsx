import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { IconSize, Map, marker } from './lib/components/Map';
import { random } from 'lodash';
import GeoJson from './data/vn.json'
function PageMap() {
    const iconSize: IconSize = [32, 32];
    const icon = {
        iconUrl: '/marker-icon.png',
        iconSize
    }
    const dfmarkers: marker[] = []
    const [markers, setMarker] = useState(dfmarkers);
    const [mapUpdate, setMapUpdate] = useState(1);

    const addMarker = () => {
        const mk = markers;
        mk.push({
            latLng: { lat: 10.7553411 + random(0.05, 0.3), lng: 106.4150407 + random(0.1, 0.3) },
            text: `Marker ${random(0.1, 0.4)}`,
            icon
        })
        setMarker(mk);
        setMapUpdate(random(0.1, 10));
    }
    useEffect(() => {
        // addMarker();
    }, [])
    return (
        <div className="App">
            <div className='container'>
                <div className='menu'><Link to="/">Back to Home</Link></div>
                <Map center={{ lat: 10.7553411, lng: 106.4150407 }} markers={markers} mapUpdate={mapUpdate} zoom={8} geoJson={GeoJson} />
            </div>
        </div>
    );
}

export default PageMap;
