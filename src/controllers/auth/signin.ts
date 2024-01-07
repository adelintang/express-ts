import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import response from '../../helpers/response'
import Users from '../../models/users'
import { type UserRequest, type User } from '../../types/Types'

const signin = async (req: Request, res: Response): Promise<Response> => {
  const { email, password }: UserRequest = req.body

  if (email === '' || password === '') {
    return response({
      statusCode: 400,
      status: 'fail',
      message: 'missing body request',
      res
    })
  }

  const foundUser: User | null = await Users.findOne({ email })

  if (foundUser === null) {
    return response({
      statusCode: 404,
      status: 'fail',
      message: 'user not found',
      res
    })
  }

  const matchPassword = await bcrypt.compare(password, foundUser.password)

  if (!matchPassword) {
    return response({
      statusCode: 401,
      status: 'fail',
      message: 'user unauthorized',
      res
    })
  }

  const userId = { userId: foundUser.id }
  const ACCESS_TOKEN: string = process.env.ACCESS_TOKEN as string
  const accessToken = jwt.sign(userId, ACCESS_TOKEN)

  return response({
    statusCode: 200,
    status: 'success',
    data: {
      accessToken
    },
    res
  })
}

export default signin
