import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL,{ Marker,Popup } from 'react-map-gl';
import {listLogEntries} from './api'
import mapboxgl from 'mapbox-gl';
import SaleEntryForm from './saleEntryForm';
import CommentEntry from './commentEntry';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const App = () => {
  const API_URL = process.env.REACT_APP_APIURL; 
  console.log(API_URL);
  const [logEntries, setLogEntries] = useState([]);
  const[showPopup,setShowPopup] = useState({});
  const[addEntryLocation,setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: 1200,
    height: 1200,
    latitude: 28.921221000,
    longitude: -82.046362000,
    zoom: 15
  });

  const handleClick = async (object) => {
    console.log(object);
    const logEntries = await listLogEntries(API_URL);
    setLogEntries(logEntries);
  }

  useEffect( () =>{
    (async() =>{

      const logEntries = await listLogEntries(API_URL);
      setLogEntries(logEntries);
    }

    )() 
  }, [API_URL]  )



 

  const showAddMarkerPopup = (event) =>{
    console.log(event);
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      longitude,
      latitude,
    })
  }

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
    >
      {
        logEntries.map( entry =>(
          <div
          onClick={() => setShowPopup({
            showPopup,[entry._id]: true,
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
            onClose={() => setShowPopup({
              showPopup,[entry._id]: false,
            })}
            anchor="top" >
            <div><h3>{entry.house}</h3></div>
            <CommentEntry comments={entry.comments}></CommentEntry>
          </Popup>
          ) : null
        }

        </div>
             
       ))
      }
      {
        addEntryLocation ? (
            <>
             <Marker           
          longitude={addEntryLocation.longitude} 
          latitude={addEntryLocation.latitude}
          offsetLeft={-20}>
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor"  fill="none" className="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>

        </Marker>

         <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setAddEntryLocation(null)}
            anchor="top" >
            <h3>Add Garage Sale House</h3>
            <SaleEntryForm close={handleClick}
                        location={addEntryLocation}> </SaleEntryForm>
          </Popup>
            </>
        ) : null
      }

      </ReactMapGL>
  );
}

export default App;