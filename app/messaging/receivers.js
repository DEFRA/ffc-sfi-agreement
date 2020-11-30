const messagingConfig = require('../config/messaging')
const { MessageReceiver } = require('ffc-messaging')

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
  startUpdateEligibility: async function (eligibilityAction) {
    updateEligibilityReceiver = new MessageReceiver(messagingConfig.updateEligibilityQueue, eligibilityAction)
    await updateEligibilityReceiver.connect()
  },
  startUpdateAgreement: async function (agreementAction) {
    updateAgreementReceiver = new MessageReceiver(messagingConfig.updateAgreementQueue, agreementAction)
    await updateAgreementReceiver.connect()
  }
}