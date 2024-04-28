import { TokenModel } from '~/model/token.model'

interface Token {
  email: string
  token: string
}

async function createToken(Token: Token) {
  return TokenModel.create(Token)
}

async function deleteToken(email: string) {
  return TokenModel.findOneAndDelete({ email: email })
}

async function findOne(email: string) {
  return TokenModel.findOne({ email: email })
}

export default {
  createToken,
  deleteToken,
  findOne
}
