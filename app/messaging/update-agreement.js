module.exports = async function (message) {
  if (message.userProperties.source === 'ffc-sfi-frontend') {
    await require('./senders').agreementChanged(message.body)
  } else {
    console.log(`Received ${JSON.stringify(message.body)} from ${message.userProperties.source}`)
  }
}
