import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};


const libraries = ['places'];
const GoogleMaps = ({ lat,long, onAddressChange }) => {
  const center = {
    lat: lat,
    lng: long
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

  const handleMapClick = (event) => {
    const clickedLocation = event.latLng;
    const lat = clickedLocation.lat();
    const lng = clickedLocation.lng();
    setMarkerPosition({ lat, lng });
    alert(`GPS Coordinates: ${lat}, ${lng}`);
    getPlaceDetails(lat, lng);
  };

  const getPlaceDetails = (lat, lng) => {
    const request = {
      location: { lat, lng },
      radius: '500' 
    };

    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    service.nearbySearch(request, function (results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results[0]) {
        const placeId = results[0].place_id;
        getPlaceAddress(placeId);
      } else {
        alert('No results found');
      }
    });
  };

  const getPlaceAddress = (placeId) => {
    const request = {
      placeId,
      fields: ['formatted_address']
    };

    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails(request, function (place, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const address = place.formatted_address;
        setAddress(address);
        if (onAddressChange) onAddressChange(address);
        alert(`Address: ${address}`);
      } else {
        alert(`Place details request failed due to: ${status}`);
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
      >
        <Marker position={markerPosition} />
      </GoogleMap>
      <div id="place-address">{address}</div>
    </div>
  ) : <></>
};

export default GoogleMaps;
