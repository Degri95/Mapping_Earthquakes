// Create the tile layer that will be the background of the map.
let day = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Dark view map
let night = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
    });

// Create a base layer that holds both maps.
let baseMaps = {
    Day: day,
    Night: night
};


// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 3,
    layers: [night]
});


// Pass the map layers into layer control and add it to the map.
L.control.layers(baseMaps).addTo(map);

let torontoData = "https://raw.githubusercontent.com/Degri95/Mapping_Earthquakes/main/torontoRoutes.json";

// Creating a style for the lines
let myStyle = {
    color: "#ffffa1",
    weight: 2
};

d3.json(torontoData).then((data) => {
    console.log(data);
   L.geoJSON(data, {
    style: myStyle,

    onEachFeature: (feature, layer) => {
        layer.bindPopup("<h2> Airline: " + feature.properties.airline + "</h2><hr><h4>Destination: " + feature.properties.dst + "</h4>");
       }
   }).addTo(map);

   
    
})

