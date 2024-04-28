import { model, Schema, Types } from 'mongoose'

export const COLLECTION_NAME = 'Token'
export const DOCUMENT_NAME = 'Token'

const TokenSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
})

export const TokenModel = model(DOCUMENT_NAME, TokenSchema, COLLECTION_NAME)
