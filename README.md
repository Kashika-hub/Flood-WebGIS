# Flood Monitoring Web GIS Portal

## Project Overview

The Flood Monitoring Web GIS Portal is an interactive web-based geographic information system developed to identify and visualize flood-prone regions using spatial analysis and web mapping technologies.

This project combines DEM-based flood analysis in QGIS with interactive visualization using Leaflet JavaScript. The portal displays flood zones, rivers, roads, hospitals, buildings, and administrative boundaries on an interactive web map.

---

# Objectives

* Identify flood-prone areas using DEM and river proximity analysis
* Visualize flood zones interactively on a web map
* Provide access to important infrastructure such as roads and hospitals
* Develop a lightweight and user-friendly Web GIS application

---

# Technologies Used

## GIS & Spatial Analysis

* QGIS
* DEM (SRTM 30m)
* GeoJSON
* OpenStreetMap Data

## Web Development

* HTML
* CSS
* JavaScript
* Leaflet JS

## Hosting

* GitHub Pages

---

# Spatial Analysis Workflow

1. Downloaded DEM data from USGS EarthExplorer
2. Extracted Kancheepuram district boundary
3. Clipped DEM using district boundary
4. Loaded river network from OpenStreetMap
5. Clipped rivers to study area
6. Generated river buffer zones
7. Created slope map from DEM
8. Extracted low-slope flood-prone regions
9. Intersected river buffer and low-slope areas
10. Generated final flood zone polygons
11. Exported all layers as GeoJSON
12. Developed interactive Web GIS portal using Leaflet

---

# Features

* Interactive Web GIS map
* Flood zone visualization
* River network display
* Roads and transport layer
* Hospital locations
* Building footprints
* Layer toggle control
* Multiple basemaps
* North arrow
* Legend
* Coordinate popup
* Responsive design

---

# Project Structure

```text
Flood-WebGIS/
│
├── index.html
├── style.css
├── script.js
│
├── reprojected/
│   ├── boundary.geojson
│   ├── flood_zones.geojson
│   ├── roads.geojson
│   ├── river.geojson
│   ├── hospitals.geojson
│   └── buildings.geojson
```

---

# Data Sources

* USGS EarthExplorer – DEM Data
* OpenStreetMap – Roads, Rivers, Buildings, Hospitals
* GADM – Administrative Boundary Data

---

# Output

The final output is an interactive Flood Monitoring Web GIS Portal capable of displaying:

* Flood-prone areas
* River systems
* Infrastructure layers
* Administrative boundaries

---

# Applications

* Flood risk visualization
* Disaster management planning
* Urban planning
* Infrastructure vulnerability assessment
* Web GIS learning and demonstration

---

# Future Improvements

* Real-time rainfall integration
* Flood prediction using machine learning
* Live sensor integration
* Mobile responsiveness improvements
* Heatmap visualization
* User location tracking

---

# Author

Kashika Venkatesan
B.E. Geoinformatics Engineering

---

# Acknowledgement

This project was developed as part of a GIS/Web GIS internship and learning initiative to gain practical experience in spatial analysis and interactive web mapping technologies.
