export const quotePath = 'quote'

export const quoteMethods = ['find', 'get', 'create', 'patch', 'remove']

export const quoteClient = (client) => {
  const connection = client.get('connection')

  client.use(quotePath, connection.service(quotePath), {
    methods: quoteMethods
  })
}
