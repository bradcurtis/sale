import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL,{ Marker,Popup } from 'react-map-gl';
import {listLogEntries} from './api'
import mapboxgl from 'mapbox-gl';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const App = () => {
  const API_URL = process.env.REACT_APP_APIURL; 
  console.log(API_URL);
  const [logEntries, setLogEntries] = useState([]);
  const[showPopup,setShowPopup] = useState({});
  const [viewport, setViewport] = useState({
    width: 1200,
    height: 1200,
    latitude: 28.921221000,
    longitude: -82.046362000,
    zoom: 15
  });

  useEffect( () =>{
    (async() =>{

      const logEntries = await listLogEntries(API_URL);
      setLogEntries(logEntries);
    }

    )() 
  }, [API_URL]  )

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {
        logEntries.map( entry =>(
          <div
          onClick={() => setShowPopup({
            showPopup,
            [entry._id]: true,
          })}
          >
          <Marker 
          key={entry._id}
          longitude={entry.location.coordinates[0]} 
          latitude={entry.location.coordinates[1]}
          offsetLeft={-20}>
          <div>{entry.house}</div>
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor"  fill="none" className="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>

        </Marker>
        {
          showPopup[entry._id] ? (
            <Popup
            latitude={entry.location.coordinates[1]}
            longitude={entry.location.coordinates[0]}
            closeButton={true}
            closeOnClick={false}
            onClose={() => this.setState({showPopup: false})}
            anchor="top" >
            <div>{entry.house}</div>
          </Popup>
          ) : null
        }

        </div>
             
       ))
      }


      </ReactMapGL>
  );
}

export default App;