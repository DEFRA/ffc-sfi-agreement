module.exports = (server, cache) => {
  server.route({
    method: 'GET',
    path: '/value',
    handler: async (request, h) => {
      const { correlationId } = request.query
      console.log(`Attempting to retrieve '${correlationId}' from cache.`)
      const value = await cache.get(correlationId)
      console.log(`Found '${JSON.stringify(value)}' for '${correlationId}'.`)
      return h.response({ correlationId, value }).code(200)
    }
  })
}
