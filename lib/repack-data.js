const uuid = require('uuid-random')

module.exports = data => {
  return {
    id: uuid(),
    url: data.loc
  }
}
