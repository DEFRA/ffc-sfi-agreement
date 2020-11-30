const server = require('./server')

const init = async () => {
  const updateAgreementAction = require('./messaging/update-agreement')
  require('./messaging/receivers').startUpdateAgreement(updateAgreementAction)

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
