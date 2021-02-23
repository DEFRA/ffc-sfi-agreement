const sharedConfig = {
  appInsights: require('applicationinsights'),
  host: process.env.SERVICE_BUS_HOST,
  password: process.env.SERVICE_BUS_PASSWORD,
  username: process.env.SERVICE_BUS_USER,
  useCredentialChain: process.env.NODE_ENV === 'production'
}

module.exports = {
  agreementChangedTopic: {
    address: process.env.AGREEMENT_CHANGED_TOPIC_ADDRESS,
    type: 'topic',
    ...sharedConfig
  },
  eligibilityChangedTopic: {
    address: process.env.ELIGIBILITY_CHANGED_TOPIC_ADDRESS,
    type: 'topic',
    ...sharedConfig
  },
  updateEligibilityQueue: {
    address: process.env.UPDATE_ELIGIBILITY_QUEUE_ADDRESS,
    type: 'queue',
    ...sharedConfig
  },
  updateAgreementQueue: {
    address: process.env.UPDATE_AGREEMENT_QUEUE_ADDRESS,
    type: 'queue',
    ...sharedConfig
  },
  agreementChangedMsgType: 'uk.gov.ffc.sfi.agreement.changed',
  eligibilityChangedMsgType: 'uk.gov.ffc.sfi.eligibility.changed',
  msgSrc: 'ffc-sfi-agreement'
}
