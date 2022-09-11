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
    "Satellite Streets": satelliteStreets
};


// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [streets]
});


// Pass the map layers into layer control and add it to the map.
L.control.layers(baseMaps).addTo(map);

let torontoHoods= "https://raw.githubusercontent.com/Degri95/Mapping_Earthquakes/main/torontoNeighborhoods.json";

d3.json(torontoHoods).then((data) => {
    console.log(data);
    L.geoJSON(data, {
        style: {
            color: "blue",
            weight: 1,
            fillColor: "yellow",
        },
        onEachFeature: (feature, layer) =>{
            layer.bindPopup("<h2>Neighborhood: " + feature.properties.AREA_NAME + "</h2>")
        }
    }).addTo(map);
});
