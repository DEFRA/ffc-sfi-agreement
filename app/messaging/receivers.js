const msgCfg = require('../config/messaging')
const { MessageReceiver } = require('ffc-messaging')
const updateAgreement = require('./update-agreement')
const { log } = require('../services/logger')

let updateAgreementReceiver
let updateEligibilityReceiver

async function stop () {
  await updateAgreementReceiver.closeConnection()
  await updateEligibilityReceiver.closeConnection()
}

process.on('SIGTERM', async () => {
  await stop()
  process.exit(0)
})

process.on('SIGINT', async () => {
  await stop()
  process.exit(0)
})

module.exports = {
  startUpdateEligibility: async function () {
    const updateAction = msg => log('Received eligibility message', msg)
    updateEligibilityReceiver = new MessageReceiver(msgCfg.updateEligibilityQueue, updateAction)
    await updateEligibilityReceiver.subscribe()
  },
  startUpdateAgreement: async function (cache) {
    const updateAction = msg => updateAgreement(msg, cache, updateAgreementReceiver)
    updateAgreementReceiver = new MessageReceiver(msgCfg.updateAgreementQueue, updateAction)
    await updateAgreementReceiver.subscribe()
  }
}
