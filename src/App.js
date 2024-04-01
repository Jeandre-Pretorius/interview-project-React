import React, { useState, useEffect } from 'react';
import { DeckGL } from '@deck.gl/react';
import { Map } from 'react-map-gl';
import { HeatmapLayer, HexagonLayer } from '@deck.gl/aggregation-layers';
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
  const [populationData, setPopulationData] = useState(null);
  const [damData, setDamData] = useState(null);
  const hexagonColorRange = [[241,238,246],
    [208,209,230],
    [166,189,219],
    [116,169,207],
    [43,140,190],
    [4,90,141]
  ];
  const heatmapColorRange = [[255,255,204],
    [199,233,180],
    [127,205,187],
    [65,182,196],
    [44,127,184],
    [37,52,148]
  ];
  const heatmap = new HeatmapLayer({
    id: 'heatmapLayer',
    data: populationData,
    getPosition: (d) => {
      return [parseFloat(d.lng), parseFloat(d.lat)];
    },
    getWeight: d => parseInt(d.population),
    colorRange: heatmapColorRange,
  });
  const hexagon = new HexagonLayer({
    id: 'hexagonLayer',
    data: damData,
    pickable: true,
    extruded: true,
    radius: 2000,
    elevationScale: 100,
    getPosition: (d) => {
      const latitude = parseFloat(d.latitude_deg) + (parseFloat(d.lat_min) / 60) + (parseFloat(d.lat_sec) / 3600);
      const longitude = parseFloat(d.longitude_deg) + (parseFloat(d.long_min) / 60) + (parseFloat(d.long_sec) / 3600);
      return [longitude, -latitude];
    },
    colorRange: hexagonColorRange,
  });

  useEffect(() => {
    // Fetch Population Data
    fetch(API_URL+'/ZA_populations')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(populationData => {
      setPopulationData(populationData);
    })
    .catch(error => console.error('There was a problem with your fetch operation:', error));

    // Fetch Dam Data
    fetch(API_URL+'/ZA_dams')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(damData => {
      setDamData(damData);
    })
    .catch(error => console.error('There was a problem with your fetch operation:', error));
  }, []);

  const layers = [
    hexagon,
    heatmap,
  ];

  return (
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <Sidebar damData={damData} isOpen={isSidebarOpen} />
        <button
            className={`toggle-btn ${isSidebarOpen ? 'open' : ''}`}
            onClick={toggleSidebar}
            style={{left: isSidebarOpen ? '320px' : '1px'}}
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