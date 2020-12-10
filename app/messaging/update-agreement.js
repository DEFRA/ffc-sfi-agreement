module.exports = (cache) => {
  return async function (msg) {
    const source = msg.userProperties.source
    const { body, correlationId } = msg
    console.log(`Received ${JSON.stringify(body)} from ${source}`)

    switch (source) {
      case 'ffc-sfi-frontend':
        await require('./senders').agreementChanged({ body, correlationId })
        break
      case 'ffc-sfi-calculator':
        await cache.set(correlationId, body)
        console.log(`Saved value: '${JSON.stringify(body)}' with key: '${correlationId}' to cache.`)
        break
      default:
        console.log(`Message from unknown message source ${source}. Purposefully doing nothing.`)
    }
  }
}
