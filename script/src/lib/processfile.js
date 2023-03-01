const path = require('path')
const { unzip } = require('./utils')
const { parseXML } = require('./utils')
const { xmlErrorHandler, xmlSuccessHandler } = require('./xml')

/**
 * Reads and parses a KMZ file
 * @param {String} filename - Filename of a target KMZ file to process inside the /data directory
 */
const processFile = async (filename = 'lao-cfavc.kmz') => {
  if (!filename.includes('.kmz')) {
    throw new Error('Not a KMZ file.')
  }

  const basePath = path.join(__dirname, '..', '..', 'data')
  const outPath = path.join(basePath, filename.split('.kmz')[0])
  const file = path.join(basePath, filename)

  const jsonPath = {
    coordinates: path.join(outPath, 'coordinates.json'),
    styles: path.join(outPath, 'styles.json')
  }

  try {
    const kmlString = unzip(file, outPath)
    parseXML(kmlString, xmlErrorHandler, xmlSuccessHandler, jsonPath)

    console.log('[LOG] Process finished.')
  } catch (err) {
    throw new Error(err.message)
  }
}

if (process.env.NODE_ENV === undefined) {
  console.log('--here')
  processFile()
}

module.exports = processFile
