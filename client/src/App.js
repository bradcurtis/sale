import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL,{ Marker } from 'react-map-gl';
import {listLogEntries} from './api'

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
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

 </Marker>
            

          
                
          
         
        
        ))
      }
      </ReactMapGL>
  );
}

export default App;