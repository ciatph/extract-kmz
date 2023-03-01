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
   - > **NOTE:** We will use v18.14.2 for the official production client and server builds but feel free to use other NodeJS versions by setting "engine-strict=false" in the .npmrc file when working on localhost development as needed, but please use v18.14.2 when installing new modules. Do not commit the package.json or package-lock.json files should they change when "engine-strict=false".

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

## Installation and Usage with Docker

We can optionally use Docker to run the dockerized script app. The following methods require a correctly installed setup of Docker and Docker compose on your development machine.

### Docker Dependencies

The following dependencies are used to build and run the image. Please feel feel free to use other OS and versions as needed.

1. Ubuntu 22.04.1
2. Docker version 23.0.1, build a5eeb1
3. Docker Compose v2.16.0

### Docker Setup

The following commands should be run from the project's root directory.

1. Stop current-running extract-kmz-script containers, if any.<br>
`docker compose down`

2. Stop and delete all docker instances for a fresh start.
   - > **NOTE:** Running this script will delete all docker images, containers, volumes, and networks. Run this script if you feel like everything is piling but do not proceed if you have important work on other running Docker containers.
   - ```
     sudo chmod u+x scripts/docker-cleanup.sh
     ./scripts/docker-cleanup.sh
     # Answer all proceeding prompts
     ```
3. Build the script container.<br>
`docker compose build`

4. Run the script container in detached mode.<br>
`docker compose up -d`

5. Put KMZ files for processing in the `"/script/data"` directory.

6. Use the script container to extract data from KMZ files.<br>
`docker exec -it extract-kmz-script npm run extract --filename=<kmz_filename>.kmz`

7. Inspect and use the extracted files under `/scripts/data/<kmz_filename>/`


@ciatph<br>
20230301
