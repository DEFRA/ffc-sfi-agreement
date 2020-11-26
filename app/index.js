const server = require('./server')

const init = async () => {
  await server.start()
  console.log('Server running on %s', server.info.uri)

  const messageAction = message => console.log(message.body)

  require('./messaging/senders').agreementChanged({ test: 'Agreement changed test 123' })
  require('./messaging/senders').eligibilityChanged({ test: 'Eligibility changed test 123' })
  require('./messaging/receivers').startUpdateAgreement(messageAction)
  require('./messaging/receivers').startUpdateEligibility(messageAction)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
