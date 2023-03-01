const fs = require('fs')
const path = require('path')
const AdmZip = require('adm-zip')
const xml2js = require('xml2js')
const parser = new xml2js.Parser({ mergeAttrs: true, explicitArray: false })

/**
 * Extracts the contents of a ZIP file to a target directory
 * @param {String} filePath - Full file path to a target ZIP file
 * @param {String} outputPath - Full file path to the target extract directory
 * @param {Function} cb - Optional callback after extraction
 * @returns {String} Extracted KML content
 * @throws {Error} Parsing/extracting errors
 */
const unzip = (filePath, outPath) => {
  try {
    const zip = new AdmZip(filePath)
    zip.extractAllTo(outPath)
    console.log(`[LOG] Files extracted to\n${outPath}`)

    return readKML(outPath)
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Find a KML file in a target directory and return it's contents as String
 * @param {String} fileDir - Full file path to a directory containing the
 *    extracted contents of a KMZ file including a KML file
 * @returns {String} Extracted KML content
 * @throws {Error} Parsing/extracting errors
 */
const readKML = (fileDir) => {
  try {
    let data
    const files = fs.readdirSync(fileDir)
    const kmlFile = files.find(file => file.endsWith('.kml'))

    if (kmlFile) {
      data = fs.readFileSync(path.join(fileDir, kmlFile), 'utf-8')
    }

    console.log(`[LOG] Loaded the contents of ${kmlFile}`)
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

/**
 *
 * @param {String} xmlString - XML written in String format
 * @param {Function} cbError - xml2js parseString() error handler callback
 * @param {Function} cb -  xml2js parseString() success handler callback
 */
const parseXML = (xmlString, cbError, cb, jsonPath) => {
  parser.parseString(xmlString, function (err, result) {
    if (err) {
      cbError(err)
    } else {
      cb(result, jsonPath)
    }
  })
}

const writeToJSON = (fileName, object) => {
  fs.writeFileSync(fileName, JSON.stringify(object), null, 2)
}

module.exports = {
  unzip,
  readKML,
  parseXML,
  writeToJSON
}
