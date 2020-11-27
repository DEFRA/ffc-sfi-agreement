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

async function sendMessage (sender, messageData, messageType) {
  await sender.connect()
  const message = {
    body: messageData,
    type: messageType,
    source: messagingConfig.messageSource
  }
  await sender.sendMessage(message)
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
