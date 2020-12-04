module.exports = async function (msg) {
  if (msg.userProperties.source === 'ffc-sfi-frontend') {
    await require('./senders').agreementChanged({ body: msg.body, correlationId: msg.correlationId })
  } else {
    console.log(`Received ${JSON.stringify(msg.body)} from ${msg.userProperties.source}`)
  }
}
