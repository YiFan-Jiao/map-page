'use strict'

mapboxgl.accessToken = 'pk.eyJ1Ijoiamlhby15aWZhbiIsImEiOiJjbGc1bTh4bjUwNGx0M2dxcmU4OWdhdDR2In0.azgKcMCQ9plNlYaY7EizEg';

function getLoaction(psition) {
const { latitude, longitude } = psition.coords;

  const geojson = {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [longitude, latitude]
        },
        'properties': {
          'title': 'Your position',
          'description': [longitude, latitude]
        }
      },
    ]
  };

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [longitude, latitude],
    zoom: 16
  });
        
  // add markers to map
        
   for (const feature of geojson.features) {
     // create a HTML element for each feature
    const el = document.createElement('div');
    el.className = 'marker';
  
    // make a marker for each feature and add it to the map
    new mapboxgl.Marker(el)
      .setLngLat(feature.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
             `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
          )
      )
      .addTo(map);
  }
}              

function errorHandler() {
  console.log('Unable to retrieve your location');
}

const options =  {
  enableHighAccuracy: true
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(getLoaction, errorHandler, options);
  } else {
    console.log('Geolocation is not supported by your browser')
  }