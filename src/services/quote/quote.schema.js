// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const quoteSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    quote: Type.String(),
    author: Type.String()
  },
  { $id: 'Quote', additionalProperties: false }
)
export const quoteValidator = getValidator(quoteSchema, dataValidator)
export const quoteResolver = resolve({})

export const quoteExternalResolver = resolve({})

// Schema for creating new entries
export const quoteDataSchema = Type.Pick(quoteSchema, ['quote', 'author'], {
  $id: 'QuoteData'
})
export const quoteDataValidator = getValidator(quoteDataSchema, dataValidator)
export const quoteDataResolver = resolve({})

// Schema for updating existing entries
export const quotePatchSchema = Type.Partial(quoteSchema, {
  $id: 'QuotePatch'
})
export const quotePatchValidator = getValidator(quotePatchSchema, dataValidator)
export const quotePatchResolver = resolve({})

// Schema for allowed query properties
export const quoteQueryProperties = Type.Pick(quoteSchema, ['_id', 'quote', 'author'])
export const quoteQuerySchema = Type.Intersect(
  [
    querySyntax(quoteQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const quoteQueryValidator = getValidator(quoteQuerySchema, queryValidator)
export const quoteQueryResolver = resolve({})
