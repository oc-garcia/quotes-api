import { quote } from './quote/quote.js'

export const services = (app) => {
  app.configure(quote)

  // All services will be registered here
}
