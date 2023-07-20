// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  quoteDataValidator,
  quotePatchValidator,
  quoteQueryValidator,
  quoteResolver,
  quoteExternalResolver,
  quoteDataResolver,
  quotePatchResolver,
  quoteQueryResolver
} from './quote.schema.js'
import { QuoteService, getOptions } from './quote.class.js'
import { quotePath, quoteMethods } from './quote.shared.js'

export * from './quote.class.js'
export * from './quote.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const quote = (app) => {
  // Register our service on the Feathers application
  app.use(quotePath, new QuoteService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: quoteMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(quotePath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(quoteExternalResolver), schemaHooks.resolveResult(quoteResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(quoteQueryValidator), schemaHooks.resolveQuery(quoteQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(quoteDataValidator), schemaHooks.resolveData(quoteDataResolver)],
      patch: [schemaHooks.validateData(quotePatchValidator), schemaHooks.resolveData(quotePatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
