// eslint-disable-next-line no-unused-vars
import * as React from 'react';

// const API_URL = process.env.REACT_APP_API_URL || 'https://arcane-plains-20636.herokuapp.com' 

export async function listLogEntries(api){
  const response = await fetch(api+"/api/sales");  
  return response.json();
}

export async function getAddress(latitude, longitude){
  const response = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=nfqtYkGKtV9LCi2lVftPBqlJARMx39AC&location=${latitude},${longitude}&includeRoadMetadata=true&includeNearestIntersection=true`)
  return response.json();
}

export async function createLogEntry(api, entry){
  const response = await fetch(api+"/api/sales",{
    method: 'POST',
    headers: {
      'content-type':'application/json',

    },
    body: JSON.stringify(entry),
  });  
  return response.json();
}

export async function deleteLogEntry(api, id){
  const response = await fetch(`${api}/api/sales/${id}`,{
    method: 'DELETE'
  });  
  return response.json();
}

export async function loginToken(api, entry){
  const response = await fetch(api+"/api/login",{
    method: 'POST',
    headers: {
      'content-type':'application/json',

    },
    body: JSON.stringify(entry),
  });  
  return response.json();
}