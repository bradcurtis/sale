import * as React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const App = () => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 28.921221000,
    longitude: -82.046362000,
    zoom: 15
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    />
  );
}

export default App;