import { Request, Response } from 'express'
import userService from '~/service/user.service'
import { StatusCodes } from 'http-status-codes'
import tokenService from '~/service/token.service'
import { TokenModel } from '~/model/token.model'
import crypto from 'crypto'
import { UserModel } from '~/model/user.model'
import sendEmail from '~/utils/sendEmail'
import { send } from 'process'

interface User {
  email: string
  location: string
}

export const register = async (req: any, res: Response) => {
  const { location, email } = req.body

  try {
    const existingUser = await userService.findByEmail(email)
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Email already exists' })
    }

    const user: User = {
      email,
      location
    }

    await userService.createUser(user)

    const token = await new TokenModel({
      email: email,
      token: crypto.randomBytes(32).toString('hex')
    }).save()

    const message = `http://localhost:3001/user/verify/${email}/${token.token}`

    await sendEmail.sendEmail(user.email, 'Verify Email', message)

    return res.status(StatusCodes.OK).send({ message: 'An Email sent to your account please verify' })
  } catch (err) {
    console.log(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Something went wrong, please try later.' })
  }
}

export const verify = async (req: any, res: Response) => {
  try {
    const user = await UserModel.findOne({ email: req.params.email })
    if (!user) return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Invalid link' })
    const token = await tokenService.findOne(user.email)

    if (!token) return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Invalid link' })

    await userService.update(user.email)
    await tokenService.deleteToken(user.email)

    return res.status(StatusCodes.OK).send({ message: 'Email verified sucessfully' })
  } catch (err) {
    console.log(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Something went wrong, please try later.' })
  }
}

export const unsubscribe = async (req: any, res: Response) => {
  const { email } = req.query

  try {
    const existingUser = await userService.findByEmail(email)
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Email dont exists' })
    }

    await userService.deleteUser(email)

    return res.status(StatusCodes.OK).send({ message: 'Unsubscribe success' })
  } catch (err) {
    console.log(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Something went wrong, please try later.' })
  }
}
