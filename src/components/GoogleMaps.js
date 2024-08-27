import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};


const libraries = ['places'];
const GoogleMaps = ({ lat,long,onLocationChange }) => {
  
  
  const center = {
    lat: parseFloat(lat),
    lng: parseFloat(long)
  };
  

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBdb9a4LIj6aaLdxOB47HRZKD8ouOB344Q" ,// Replace with your API key
    libraries
  });

 
  const [markerPosition, setMarkerPosition] = useState(center);
  const [address, setAddress] = useState('');

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
   
  }, []);

  const onUnmount = useCallback(function callback(map) {
   
  }, []);

  const handleMapClick = async (event) => {
    const clickedLocation = event.latLng;
    const lat = clickedLocation.lat();
    const lng = clickedLocation.lng();
    setMarkerPosition({ lat, lng });
  
    alert(`GPS Coordinates: ${lat}, ${lng}`);
   
  
    try {
      const address = await getPlaceDetails(lat, lng);
      setAddress(address);
      alert(`Address: ${address}`);
      
      // Call the onLocationChange callback with all values
      if (onLocationChange) onLocationChange({ lat, lng, address });
    } catch (error) {
      alert('Failed to fetch place details');
    }
  };
  
  

  const getPlaceDetails = (lat, lng) => {
    return new Promise((resolve, reject) => {
      const request = {
        location: { lat, lng },
        radius: '50'
      };
  
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results[0]) {
          const placeId = results[0].place_id;
          getPlaceAddress(placeId, resolve, reject);
        } else {
          reject('No results found');
        }
      });
    });
  };
  

  const getPlaceAddress = (placeId, resolve, reject) => {
    const request = {
      placeId,
      fields: ['formatted_address']
    };
  
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        resolve(place.formatted_address);
      } else {
        reject(`Place details request failed due to: ${status}`);
      }
    });
  };
  

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        mapTypeId='hybrid'
      >
        <Marker position={markerPosition} />
      </GoogleMap>
      <div id="place-address">{address}</div>
    </div>
  ) : <></>
};

export default GoogleMaps;
