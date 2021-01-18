const { MessageSender } = require('ffc-messaging')
const msgCfg = require('../config/messaging')
const { log } = require('../services/logger')

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

async function sendMsg (sender, msgData, msgType) {
  await sender.connect()
  const msgBase = {
    type: msgType,
    source: msgCfg.msgSrc
  }
  const msg = { ...msgData, ...msgBase }
  log('sending message', msg)
  await sender.sendMessage(msg)
  await sender.closeConnection()
}

module.exports = {
  agreementChanged: async function (agreementData) {
    agreementChangedSender = new MessageSender(msgCfg.agreementChangedTopic)
    await sendMsg(agreementChangedSender, agreementData, msgCfg.agreementChangedMsgType)
  },
  eligibilityChanged: async function (eligibilityData) {
    eligibilityChangedSender = new MessageSender(msgCfg.eligibilityChangedTopic)
    await sendMsg(eligibilityChangedSender, eligibilityData, msgCfg.eligibilityChangedMsgType)
  }
}
