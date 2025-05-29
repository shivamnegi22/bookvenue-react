import React, { useState, useEffect } from 'react';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import Loader from './loader';
import { useNavigate } from 'react-router-dom';

const LocationAwareMap = ({height, styles, icon, coords, onMarkerDragEnd, markerDraggable, markerTitle, markers, loaderStyle, redirect}) => {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsApiKey,
  });

  const [location, setLocation] = useState(null);
  // Function to handle location change
  const handleLocationUpdate = (position) => {
    setLocation(position);
  };

  // Use the Geolocation API to get the user's current location
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(handleLocationUpdate,
        (error) => {
          console.error("Error getting location:", error);
        });
    } else {
        alert('Geolocation is not available in this browser.');
    }
  }, []);

  // Google Maps API key (replace with your own)
  

  // Map options
  const mapContainerStyle = {
    width: '100%',
    height: height ? height : '70vh',
  };


  return (
    <>
    {isLoaded ?
    <GoogleMap
    mapContainerStyle={mapContainerStyle}
    center={coords == undefined ? location ? { lat: location.coords.latitude, lng: location.coords.longitude } : { lat: 30.3317463, lng: 78.0289588 } : coords}
    zoom={(location || coords) ? 13 : 12} // Adjust the zoom level as needed
    options={{
              styles: styles == undefined ? [
              { 
                featureType: "poi",
                stylers: [
                  { "visibility": "off" }
                ]
              }
              ]
              :
              styles
            }}
  >
    
    {(location || coords) && (
      <>
      <MarkerF
          key={'currentLocation'}
          title={markerTitle == undefined ? "Your Location" : markerTitle}
          position={coords == undefined ? { lat: location.coords.latitude, lng: location.coords.longitude } : coords ? coords : { lat: location.coords.latitude, lng: location.coords.longitude }}
          icon={{
              url: icon == undefined ? "/Location.svg" : icon
          }}
          onDragEnd={onMarkerDragEnd == undefined ? null : onMarkerDragEnd}
          draggable={markerDraggable == undefined ? false : markerDraggable}
        />
      
      </>
    )}

      {
        Array.isArray(markers) && markers.length > 0 ? 
        markers.map((item,index)=>{
          return (
            <MarkerF
            key={item.slug}
            title={item.official_name}
            position={{lat: parseFloat(item.lat), lng: parseFloat(item.lng)}}
            onClick={()=>{
              navigate(`/facility/${item.slug}`)
            }}
            icon={{url: "/markerLocation.svg"}}
          
          />
          )
        })
        :
        null
      }
  </GoogleMap>
  :
  <Loader className={loaderStyle}/>
   }</>
  );
};

export default LocationAwareMap;
