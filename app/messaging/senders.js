const { MessageSender } = require('ffc-messaging')
const msgCfg = require('../config/messaging')
const { log } = require('../services/logger')

const agreementChangedSender = new MessageSender(msgCfg.agreementChangedTopic)
const eligibilityChangedSender = new MessageSender(msgCfg.eligibilityChangedTopic)

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

async function sendMsg (sender, msgData, msgType) {
  const msgBase = {
    type: msgType,
    source: msgCfg.msgSrc
  }
  const msg = { ...msgData, ...msgBase }

  log('sending message', msg)

  await sender.sendMessage(msg)
}

module.exports = {
  agreementChanged: async function (agreementData) {
    await sendMsg(agreementChangedSender, agreementData, msgCfg.agreementChangedMsgType)
  },
  eligibilityChanged: async function (eligibilityData) {
    await sendMsg(eligibilityChangedSender, eligibilityData, msgCfg.eligibilityChangedMsgType)
  }
}
