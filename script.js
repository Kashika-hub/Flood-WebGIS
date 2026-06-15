// ======================================
// FLOOD MONITORING WEB GIS PORTAL
// FULL CORRECTED LEAFLET CODE
// ======================================

// ======================================
// CREATE MAP
// ======================================

var map = L.map('map', {
    center: [12.8342, 79.7036],
    zoom: 10
});

// ======================================
// BASEMAPS
// ======================================

var osm = L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
    attribution: '© OpenStreetMap'
}).addTo(map);

var satellite = L.tileLayer(
'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
{
    attribution: 'Tiles © Esri'
});

// ======================================
// CREATE EMPTY LAYER GROUPS
// ======================================

var boundaryLayer = L.layerGroup().addTo(map);
var floodLayer = L.layerGroup().addTo(map);
var riverLayer = L.layerGroup().addTo(map);
var roadLayer = L.layerGroup().addTo(map);
var hospitalLayer = L.layerGroup().addTo(map);
var buildingLayer = L.layerGroup().addTo(map);

// ======================================
// LOAD BOUNDARY
// ======================================

fetch('./reprojected/boundary_simple.geojson')

.then(response => response.json())

.then(data => {

    var geojson = L.geoJSON(data, {

        style: {
            color: 'black',
            weight: 3,
            fillOpacity: 0
        }

    });

    boundaryLayer.addLayer(geojson);

    map.fitBounds(
        geojson.getBounds(),
        {
            padding:[20,20]
        }
    );

});

// ======================================
// LOAD FLOOD ZONES
// ======================================

fetch('./reprojected/flood_zones.geojson')

.then(response => response.json())

.then(data => {

    var geojson = L.geoJSON(data, {

        style: {
            color: 'red',
            fillColor: 'red',
            weight: 1,
            fillOpacity: 0.5
        },

        onEachFeature: function(feature, layer){

            layer.bindPopup(
                "<b>Flood Zone</b><br>High Flood Risk Area"
            );

        }

    });

    floodLayer.addLayer(geojson);

});

// ======================================
// LOAD RIVERS
// ======================================

fetch('./reprojected/river.geojson')

.then(response => response.json())

.then(data => {

    var geojson = L.geoJSON(data, {

        style: {
            color: 'blue',
            weight: 2
        },

        onEachFeature: function(feature, layer){

            var riverName =
                feature.properties.name ||
                feature.properties.NAME ||
                "Unnamed River";

            layer.bindPopup(
                "<b>River:</b><br>" + riverName
            );

        }

    });

    riverLayer.addLayer(geojson);

});

// ======================================
// LOAD ROADS
// ======================================

fetch('./reprojected/roads.geojson')

.then(response => response.json())

.then(data => {

    var geojson = L.geoJSON(data, {

        style: function(feature){

            return {
                color: 'black',
                weight: 1
            };

        },

        onEachFeature: function(feature, layer){

            var roadName =
                feature.properties.name ||
                feature.properties.NAME ||
                "Unnamed Road";

            layer.bindPopup(
                "<b>Road:</b><br>" + roadName
            );

        }

    });

    roadLayer.addLayer(geojson);

});

// ======================================
// LOAD HOSPITALS
// ======================================

fetch('./reprojected/hospitals.geojson')

.then(response => response.json())

.then(data => {

    var geojson = L.geoJSON(data, {

        pointToLayer: function(feature, latlng){

            return L.circleMarker(latlng, {

                radius: 6,
                color: 'darkred',
                fillColor: 'red',
                fillOpacity: 1

            });

        },

        onEachFeature: function(feature, layer){

            var hospitalName =
                feature.properties.name ||
                feature.properties.NAME ||
                "Hospital";

            layer.bindPopup(
                "<b>Hospital:</b><br>" + hospitalName
            );

        }

    });

    hospitalLayer.addLayer(geojson);

});

// ======================================
// LOAD BUILDINGS
// ======================================

fetch('./reprojected/buildings.geojson')

.then(response => response.json())

.then(data => {

    var geojson = L.geoJSON(data, {

        style: {
            color: 'gray',
            weight: 0.5,
            fillColor: 'lightgray',
            fillOpacity: 0.3
        },

        onEachFeature: function(feature, layer){

            layer.bindPopup(
                "<b>Building</b>"
            );

        }

    });

    buildingLayer.addLayer(geojson);

});

// ======================================
// LAYER CONTROL
// ======================================

var baseMaps = {
    "OpenStreetMap": osm,
    "Satellite": satellite,
};

var overlayMaps = {
    "Boundary": boundaryLayer,
    "Flood Zones": floodLayer,
    "Rivers": riverLayer,
    "Roads": roadLayer,
    "Hospitals": hospitalLayer,
    "Buildings": buildingLayer
};

L.control.layers(
    baseMaps,
    overlayMaps,
    {
        collapsed: false
    }
).addTo(map);

// ======================================
// SCALE BAR
// ======================================

L.control.scale().addTo(map);

// ======================================
// NORTH ARROW
// ======================================

var north = L.control({position: 'topright'});

north.onAdd = function(map){

    var div = L.DomUtil.create('div', 'north-arrow');

    div.innerHTML = `
        <div style="
            background:white;
            padding:8px;
            border:2px solid black;
            border-radius:5px;
            text-align:center;
            font-weight:bold;
            font-size:20px;
        ">
            ↑<br>N
        </div>
    `;

    return div;
};

north.addTo(map);

// ======================================
// LEGEND
// ======================================

var legend = L.control({position: 'bottomright'});

legend.onAdd = function(map){

    var div = L.DomUtil.create('div', 'legend');

    div.innerHTML = `

    <div style="
        background:white;
        padding:10px;
        border-radius:5px;
        border:1px solid black;
    ">

    <h4>Legend</h4>

    <p>
    <span style="
        background:red;
        width:20px;
        height:10px;
        display:inline-block;
    "></span>
    Flood Zone
    </p>

    <p>
    <span style="
        background:blue;
        width:20px;
        height:3px;
        display:inline-block;
    "></span>
    River
    </p>

    <p>
    <span style="
        background:black;
        width:20px;
        height:3px;
        display:inline-block;
    "></span>
    Road
    </p>

    <p>
    <span style="
        background:red;
        width:10px;
        height:10px;
        border-radius:50%;
        display:inline-block;
    "></span>
    Hospital
    </p>

    </div>
    `;

    return div;
};

legend.addTo(map);

// ======================================
// CLICK COORDINATES
// ======================================

map.on('click', function(e){

    var lat = e.latlng.lat.toFixed(5);
    var lon = e.latlng.lng.toFixed(5);

    L.popup()

    .setLatLng(e.latlng)

    .setContent(
        "<b>Coordinates</b><br>" +
        "Latitude: " + lat +
        "<br>Longitude: " + lon
    )

    .openOn(map);

});

// ======================================
// FLOOD MESSAGE
// ======================================

var floodMessage = L.control({position:'topleft'});

floodMessage.onAdd = function(map){

    var div = L.DomUtil.create('div');

    div.innerHTML = `
    <div style="
        background:white;
        padding:10px;
        border:2px solid red;
        border-radius:5px;
        font-weight:bold;
    ">
        Flood Monitoring Web GIS Portal
    </div>
    `;

    return div;
};

floodMessage.addTo(map);

// ======================================
// END
// ======================================