import { model, Schema, Types } from 'mongoose'

export const COLLECTION_NAME = 'User'
export const DOCUMENT_NAME = 'User'

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  }
})

export const UserModel = model(DOCUMENT_NAME, UserSchema, COLLECTION_NAME)
