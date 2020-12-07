const Hapi = require('@hapi/hapi')

const server = Hapi.server({
  port: process.env.PORT
})

function createCache (server) {
  return server.cache({
    expiresIn: 3600 * 1000, // 1 hour
    segment: 'correlationIds'
  })
}
const cache = createCache(server)

const routes = [
  require('./routes/healthy'),
  require('./routes/healthz')
]
server.route(routes)
require('./routes/value')(server, cache)

const updateAgreementAction = require('./messaging/update-agreement')
require('./messaging/receivers').startUpdateAgreement(updateAgreementAction(cache))

module.exports = server
