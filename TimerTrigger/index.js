const getSitemap = require('../lib/get-sitemap')
const wakeupService = require('../lib/wakeup-service')
const deleteIndex = require('../lib/delete-index')
const repackData = require('../lib/repack-data')

module.exports = async function (context) {
  const data = await getSitemap(context)
  if (data.length > 0) {
    context.log(`Got data - ${data.length}`)
    const service = await wakeupService(context)
    context.log(`Service awake: ${service ? 'yes' : 'no'}`)
    const result = deleteIndex(context)
    context.log(`index deleted ${JSON.stringify(result)}`)
    context.log(`repacks data add jobs to queue`)
    context.bindings.mySbQueue = data
      .map(repackData)
      .map(item => Object.assign({}, { id: item.id, payload: item }))[0]
  } else {
    context.log(`Nothing to index`)
  }
  context.log(`finished`)
}
