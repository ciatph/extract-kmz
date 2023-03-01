const processFile = require('./lib/processfile')
const { getargs } = require('./lib/getargs')

const main = async () => {
  try {
    const params = getargs(['filename'])

    await processFile(params.filename)
  } catch (err) {
    console.log(`[ERROR] ${err.message}`)
    process.exit(1)
  }
}

main()
