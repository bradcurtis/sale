import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL,{ Marker } from 'react-map-gl';
import {listLogEntries} from './api'
import mapboxgl from 'mapbox-gl';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [viewport, setViewport] = useState({
    width: 1200,
    height: 1200,
    latitude: 28.921221000,
    longitude: -82.046362000,
    zoom: 15
  });

  useEffect( () =>{
    (async() =>{
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    }

    )() 
  }, []  )

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {
        logEntries.map( entry =>(
          <Marker longitude={entry.location.coordinates[0]} 
          latitude={entry.location.coordinates[1]}
          offsetLeft={-20}>
            <div>{entry.house}</div>
<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>

 </Marker>
            

          
                
          
         
        
        ))
      }
      </ReactMapGL>
  );
}

export default App;