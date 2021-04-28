import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL,{ Marker,Popup } from 'react-map-gl';
import {listLogEntries,deleteLogEntry} from './api'
import mapboxgl from 'mapbox-gl';
import SaleEntryForm from './saleEntryForm';
import CommentEntry from './commentEntry';
import Login from './login';
import useToken from './useToken';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
//require('dotenv').config();
const API_URL = process.env.REACT_APP_APIURL;

const App = () => {
  
  
  //console.log(API_URL);
  const [logEntries, setLogEntries] = useState([]);
  const[showPopup,setShowPopup] = useState({});
  const[addEntryLocation,setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 28.921221000,
    longitude: -82.046362000,
    zoom: 15
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  const deleteEntry = async (id) => {
    await deleteLogEntry(API_URL,id);
  }

  const { token, setToken } = useToken();



  useEffect( () =>{
    (async() =>{

      const logEntries = await listLogEntries(API_URL);
      setLogEntries(logEntries);
    }

    )() 
  } )



 

  const showAddMarkerPopup = (event) =>{
    console.log(event);
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      longitude,
      latitude,
    })
  }

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (

    

    
    <div>
      <h1 align='center'>Oxford Oaks Garage Sale</h1>
      <h4 align='center'>double click on your approximate address and enter your information</h4>
       <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle="mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
      onDblClick={showAddMarkerPopup}
    >
      {
        logEntries.map( entry =>(
          <div
          onClick={() => setShowPopup({
            showPopup,[entry._id]: true,
          })}
          key={entry._id}
          >
          <Marker 
          key={entry._id}
          longitude={entry.location.coordinates[0]} 
          latitude={entry.location.coordinates[1]}
          offsetLeft={-20}>
          <div>{entry.house}</div>
          <svg
                className="marker red"
                style={{
                  height: `${2 * viewport.zoom}px`,
                  width: `${2 * viewport.zoom}px`,
                }}
                version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                <g>
                  <g>
                    <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                      c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                      c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                  </g>
                </g>
              </svg>
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
              <div className="popup">
            <h3>{entry.house}</h3>
            <CommentEntry comments={entry.comments}></CommentEntry>
           
            </div>
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
           <svg
                  className="marker yellow"
                  style={{
                    height: `${2 * viewport.zoom}px`,
                    width: `${2 * viewport.zoom}px`,
                  }}
                  version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                  <g>
                    <g>
                      <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                    </g>
                  </g>
                </svg>
        </Marker>

         <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setAddEntryLocation(null)}
            anchor="top" >
            <div className="popup">
            <h3>Add Garage Sale House</h3>
            <SaleEntryForm onClose={() => {
                setAddEntryLocation(null);
                getEntries();
              }} 
              location={addEntryLocation}> </SaleEntryForm>
              </div>
          </Popup>
            </>
        ) : null
      }


      </ReactMapGL>
      </div>
  );
}

export default App;