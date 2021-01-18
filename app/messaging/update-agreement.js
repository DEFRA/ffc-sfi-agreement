const { log } = require('../services/logger')

module.exports = (cache) => {
  return async function (msg) {
    const source = msg.userProperties.source
    const { body, correlationId } = msg
    log(`Received ${JSON.stringify(body)} from ${source}`)

    switch (source) {
      case 'ffc-sfi-frontend':
        await require('./senders').agreementChanged({ body, correlationId })
        break
      case 'ffc-sfi-calculator':
        await cache.set(correlationId, body)
        log(`Saved value: '${JSON.stringify(body)}' with key: '${correlationId}' to cache.`)
        break
      default:
        log(`Message from unknown message source ${source}. Purposefully doing nothing.`)
    }
  }
}
