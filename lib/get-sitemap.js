const axios = require('axios')
const { parseString } = require('xml2js')

module.exports = context => {
  return new Promise(async (resolve, reject) => {
    context.log(`get-sitemap - ${process.env.SITEMAP_URL} - start`)
    const { data } = await axios.get(process.env.SITEMAP_URL)
    parseString(data, { explicitArray: false, trim: true }, (error, data) => {
      if (error) {
        context.log.error(`get-sitemap - ${error}`)
        return reject(error)
      } else {
        if (data.urlset || data.urlset.url) {
          context.log(`get-sitemap - got urls`)
          return resolve(Array.isArray(data.urlset.url) ? data.urlset.url : [data.urlset.url])
        } else {
          context.log(`get-sitemap - no urls found`)
          return resolve([])
        }
      }
    })
  })
}
