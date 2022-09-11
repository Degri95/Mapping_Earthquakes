// Create the tile layer that will be the background of the map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Dark view map
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
    });

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
};


// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [39.5, -98.51],
    zoom: 3,
    layers: [streets]
});


// Pass the map layers into layer control and add it to the map.
L.control.layers(baseMaps).addTo(map);

let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Retreive the data
d3.json(earthquakeData).then((data) => {
    //Create GeoJSON Layer with data
    L.geoJSON(data).addTo(map);
});