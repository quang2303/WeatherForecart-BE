import { UserModel } from '~/model/user.model'

interface User {
  email: string
  location: string
}

async function createUser(User: User) {
  return UserModel.create(User)
}

async function deleteUser(email: string) {
  return UserModel.deleteOne({ email: email })
}

async function findByEmail(email: string) {
  return UserModel.findOne({ email: email })
}

async function update(email: string) {
  return UserModel.findOneAndUpdate({ email: email }, { verified: true })
}

export default {
  createUser,
  deleteUser,
  findByEmail,
  update
}
