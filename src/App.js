import React, { useState } from 'react';
import { DeckGL } from '@deck.gl/react';
import { Map } from 'react-map-gl';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import Sidebar from './components/Sidebar';
import './App.css';

// Mapbox token
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

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

  // Dummy data for the heatmap layer
  const data = [
    { position: [28.0473, -26.2041], weight: 10 }, // Johannesburg
    { position: [18.4241, -33.9249], weight: 13 }, // Cape Town
    { position: [30.9576, -29.8587], weight: 7 }, // Durban
    { position: [25.6953, -25.8467], weight: 5 }, // Pretoria
    { position: [27.8913, -26.6667], weight: 4 }, // Bloemfontein
    { position: [23.9112, -29.4568], weight: 1 }, // Kimberley
    { position: [31.5927, -29.0825], weight: 5 }, // Port Elizabeth
    { position: [27.4869, -23.4042], weight: 1 }, // Polokwane
    { position: [30.9718, -25.4701], weight: 2 }, // Nelspruit
    { position: [26.1599, -28.7463], weight: 1 }, // Welkom
  ];

  const layers = [
    new HeatmapLayer({
      id: 'heatmapLayer',
      data,
      getPosition: d => d.position,
      getWeight: d => d.weight,
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
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar isOpen={isSidebarOpen} />
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