import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { IconSize, Map, marker } from './lib/components/Map';
import { random } from 'lodash';
function PageMap() {
    const iconSize: IconSize = [32, 32];
    const icon = {
        iconUrl: '/marker-icon.png',
        iconSize
    }
    const dfmarkers: marker[] = [

        {
            latLng: { lat: 10.78010924281412, lng: 106.72247585547873 },
            text: 'Eton head office',
            icon
        },
        {
            latLng: { lat: 10.718668000329831, lng: 106.7434837554785 },
            text: 'Kho quận 7',
            icon
        }/*,
         {
            latLng: { lat: 10.94724809947367, lng: 106.73424182849318 },
            text: 'Kho Bình Dương',
            icon
        } */
    ]
    const [markers, setMarker] = useState(dfmarkers);
    const [mapUpdate, setMapUpdate] = useState(1);

    const addMarker = () => {
        const mk = markers;
        mk.push({
            latLng: { lat: 10.94724809947367 + random(0.1, 0.4), lng: 106.73424182849318 + random(0.1, 0.4) },
            text: `Marker ${random(0.1, 0.4)}`,
            icon
        })
        setMarker(mk);
        setMapUpdate(random(0.1, 10));
    }
    useEffect(() => {
        setMapUpdate(random(0.1, 10));
        // addMarker();
    }, [])
    return (
        <div className="App">
            <div className='container'>
                <div className='menu'><Link to="/">Back to Home</Link> | <button onClick={() => addMarker()}>Add marker</button></div>
                <Map center={{ lat: 10.78010924281412, lng: 106.72247585547873 }} markers={markers} mapUpdate={mapUpdate} />
            </div>
        </div>
    );
}

export default PageMap;
