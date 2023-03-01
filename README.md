## extract-kmz

Extract geo (lat, lng) coordinates and text information from KMZ files to use with various points clustering libraries for webmaps.

**LeafletJS**

- [OverlappingMarkerSpiderfier-Leaflet](https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet)
- [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)

**Google Maps**

- [OverlappingMarkerSpiderfier](https://github.com/jawj/OverlappingMarkerSpiderfier)

### Dependencies

The following dependecies are used for this project. Feel free to experiment using other dependencies and versions.

1. Windows 64-bit OS
2. nvm version 1.1.9 (for Windows)
3. NodeJS 18.14.2 installed using nvm
   - node v18.14.2
   - npm v9.5.0

## Installation

1. Clone this repository.<br>
`https://github.com/ciatph/extract-kmz.git`

2. Install the dependencies of the `/script` directory.<br>
   ```
   cd script
   npm install
   ```

3. Put KMZ files for processing in the `/script/data` directory.

4. Extract styles and coordinates data from a KMZ file. Read the [Available Scripts](#available-scripts) section for more information.

## Available Scripts

### `npm run extract`

This script requires KMZ files placed inside the `/script/data` directory.

Full usage: `npm run extract --filename=<target_kmz_file>.kmz`

- Extracts KML and other files from a KMZ file
- Writes processed KML styles to `/data/<target_kmz_file>/styles.json`
- Writes processed KML point coordinates to `/data/<target_kmz_file>/coordinates.json`

@ciatph<br>
20230301
