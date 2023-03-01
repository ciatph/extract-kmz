const { writeToJSON } = require('./utils')

/**
 * Handles the xml2js error response
 * @param {String} err - Error message when parsing XML from xml2js
 */
const xmlErrorHandler = (err) => {
  console.log(`[ERROR] ${err}`)
  process.exit(1)
}

/**
 * Process the xml2js extracted data XML data objects
 * Extract data from an XML string: { styles, coordinates }
 *    - styles: {Object[]} - List of icon ID's and icons
 *    - coordinates: {Object[]} - List of [lat, lng] and description per point coordinate
 * @param {Object} kml - XML object result from xml2js
 * @throws {Error} Object processing error messages
 */
const xmlSuccessHandler = async ({ kml }, jsonPath) => {
  try {
    let coordinates = []

    if (kml.Document.Folder.Folder === undefined) {
      console.log('[ERROR] KMZ format is not supported.')
      process.exit(1)
    }

    // Extract style ID's and icons
    const styles = kml.Document.Style.reduce((list, style) => {
      if (style.id) {
        return [ ...list, {
          id: style.id,
          icon: style.IconStyle.Icon.href
        }]
      } else {
        return list
      }
    }, [])

    // Extract coordinates and point description
    for (let i = 0; i < kml.Document.Folder.Folder.length; i += 1) {
      if (kml.Document.Folder.Folder[i].Placemark !== undefined) {
        const { name } = kml.Document.Folder.Folder[i]

        if (name !== 'FALSE') {
          const { name, Placemark } = kml.Document.Folder.Folder[i]

          coordinates.push({
            name,
            data: Placemark.reduce((list, place, id) => [
              ...list,
              {
                id,
                styleId: place.styleUrl,
                description: place.description,
                coordinates: [place.LookAt.latitude, place.LookAt.longitude]
              }
            ], [])
          })
        }
      }
    }

    console.log(`[LOG] KML parsing success.`)

    writeToJSON(jsonPath.styles, styles)
    writeToJSON(jsonPath.coordinates, coordinates)
  } catch (err) {
    throw new Error(err.message)
  }
}

module.exports = {
  xmlErrorHandler,
  xmlSuccessHandler
}
