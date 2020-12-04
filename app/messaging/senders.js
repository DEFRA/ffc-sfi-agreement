const messagingConfig = require('../config/messaging')
const { MessageSender } = require('ffc-messaging')

let agreementChangedSender
let eligibilityChangedSender

async function stop () {
  await agreementChangedSender.closeConnection()
  await eligibilityChangedSender.closeConnection()
}

process.on('SIGTERM', async () => {
  await stop()
  process.exit(0)
})

process.on('SIGINT', async () => {
  await stop()
  process.exit(0)
})

async function sendMessage (sender, msgData, msgType) {
  await sender.connect()
  const msgBase = {
    type: msgType,
    source: messagingConfig.messageSource
  }
  const msg = { ...msgData, ...msgBase }
  console.log('sending message', msg)
  await sender.sendMessage(msg)
  await sender.closeConnection()
}

module.exports = {
  agreementChanged: async function (agreementData) {
    agreementChangedSender = new MessageSender(messagingConfig.agreementChangedTopic)
    await sendMessage(agreementChangedSender, agreementData, messagingConfig.agreementChangedMessageType)
  },
  eligibilityChanged: async function (eligibilityData) {
    eligibilityChangedSender = new MessageSender(messagingConfig.eligibilityChangedTopic)
    await sendMessage(eligibilityChangedSender, eligibilityData, messagingConfig.eligibilityChangedMessageType)
  }
}
