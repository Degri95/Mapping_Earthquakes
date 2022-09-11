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

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// define an object the contains the overlays
let overlays = {
    Earthquakes: earthquakes
};

// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [39.5, -98.51],
    zoom: 3,
    layers: [streets]
});


// Pass the map layers into layer control and add it to the map.
L.control.layers(baseMaps, overlays).addTo(map);

// Earthquake URL
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Retreive the data
d3.json(earthquakeData).then((data) => {
    
    // Creating style 
    function styleInfo(feature){
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        }
}
    function getRadius(magnitude){
        if (magnitude === 0){
            return 1;
        }
        return magnitude * 4;
    };

    function getColor(magnitude){
        if (magnitude > 5) {
            return "#ea2c2c";
        }
        if (magnitude > 4) {
            return "#ea822c";

        }
        if (magnitude > 3) {
            return "#ee9c00";
        }
        if (magnitude > 2) {
            return "#eecc00";
        }
        if (magnitude > 1) {
            return "#d4ee00";
        }
        return "#98ee00";
            };
    
    //Create GeoJSON Layer with data
    L.geoJSON(data, {
        pointToLayer: (feature, latlng) => {
            console.log(data);
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        onEachFeature: (feature, layer) => {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>location: " + feature.properties.place);
        }
    }).addTo(earthquakes);
    // add earthquakes to map
    earthquakes.addTo(map);

    let legend = L.control({
        position: 'bottomright'
    });

    legend.onAdd = function () {

        let div = L.DomUtil.create('div', 'info legend');
           const magnitudes = [0, 1, 2, 3, 4 ,5];
           const colors = [
            "#98ee00",
            "#d4ee00",
            "#eecc00",
            "#ee9c00",
            "#ea822c",
            "#ea2c2c"
           ];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (let i = 0; i < magnitudes.length; i++) {
            console.log(colors[i]);
            div.innerHTML +=
                '<i style="background:' + colors[i] + '"></i> ' +
                magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(map)
});