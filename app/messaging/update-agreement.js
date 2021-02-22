const { log } = require('../services/logger')
const { agreementChanged } = require('./senders')

module.exports = async function (msg, cache, updateAgreementReceiver) {
  try {
    const source = msg.applicationProperties.source
    const { body, correlationId } = msg

    log(`Received ${JSON.stringify(body)} from ${source}`)

    switch (source) {
      case 'ffc-sfi-frontend':
        await agreementChanged({ body, correlationId })
        break
      case 'ffc-sfi-calculator':
        await cache.set(correlationId, body)
        log(`Saved value: '${JSON.stringify(body)}' with key: '${correlationId}' to cache.`)
        break
      default:
        log(`Message from unknown message source ${source}. Purposefully doing nothing.`)
    }

    await updateAgreementReceiver.completeMessage(msg)
  } catch (err) {
    console.error('Unable to process message:', err)
    await updateAgreementReceiver.abandonMessage(msg)
  }
}
