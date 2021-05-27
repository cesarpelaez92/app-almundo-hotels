import React, { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '150px'
};

interface MapProps {
  geolocationLat?: Number;
  geolocationLon?: Number;
  center?: {};
  zoom?: Number;
};

const mapComponent = (props: MapProps) => {
  const {geolocationLat, geolocationLon, zoom} = props;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik"
  })

  const center = {
    lat: geolocationLat,
    lng: geolocationLon,
  }

  return (
    <div>
      {
        isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
          >
             <Marker
              animation={google.maps.Animation.DROP}
              position={center}
              title="Hotel"
            />
          </GoogleMap>
        ) : (<></>)
      }
    </div>
  )
}

export default mapComponent
