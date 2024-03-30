import React, { useState, useEffect } from 'react';
import { DeckGL } from '@deck.gl/react';
import { Map } from 'react-map-gl';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import Sidebar from './components/Sidebar';
import './App.css';
import '@fontsource/inter';

// Mapbox token
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [viewState, setViewState] = useState({
    longitude: 28.0473,
    latitude: -26.2041,
    zoom: 4,
    pitch: 0,
    bearing: 0,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    console.log(API_URL+'/ZA_populations');
    fetch(API_URL+'/ZA_populations')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Only call .json() once here
    })
    .then(data => {
      console.log(data); // Log the data here, after it has been parsed
      setData(data);
    })
    .catch(error => console.error('There was a problem with your fetch operation:', error));
  }, []);

  const layers = [
    new HeatmapLayer({
      id: 'heatmapLayer',
      data,
      getPosition: (d) => {
        return [parseFloat(d.lng), parseFloat(d.lat)];
      },
      getWeight: d => parseInt(d.population),
    }),
  ];

  const customMapStyle = {
    version: 8,
    sources: {
      // Define your sources here
    },
    layers: [
      // Define your layers here
    ],
    layout: {
      'attribution-control': {
        display: 'none'
      },
      'logo-control': {
        display: 'none'
      }
    },
    paint: {
      // Paint properties
    }
  };

  return (
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <Sidebar data={data} isOpen={isSidebarOpen} />
        <button
            className={`toggle-btn ${isSidebarOpen ? 'open' : ''}`}
            onClick={toggleSidebar}
            style={{left: isSidebarOpen ? '320px' : '1px'}} // Dynamically adjust based on isSidebarOpen
        >
          <div className="icon"></div>
        </button>
        <div style={{flex: 1, position: 'relative'}}>
          <DeckGL initialViewState={viewState} controller={true} layers={layers}>
            <Map
                mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/dark-v11"
            />
          </DeckGL>
        </div>
      </div>
  );
}

export default App;