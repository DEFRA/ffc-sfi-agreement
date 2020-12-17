module.exports = (server, cache) => {
  server.route({
    method: 'GET',
    path: '/value',
    handler: async (request, h) => {
      const { correlationId } = request.query
      console.log(`Attempting to retrieve '${correlationId}' from cache.`)
      const body = await cache.get(correlationId)
      console.log(`Found '${JSON.stringify(body)}' for '${correlationId}'.`)
      return h.response({ correlationId, body }).code(200)
    }
  })
}
