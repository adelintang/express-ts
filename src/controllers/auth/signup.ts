import { type Request, type Response } from 'express'
import bcrypt from 'bcrypt'
import response from '../../helpers/response'
import Users from '../../models/users'
import { type UserRequest } from '../../types/Types'

const signup = async (req: Request, res: Response): Promise<Response> => {
  const { email, username, password }: UserRequest = req.body

  if (email === '' || username === '' || password === '') {
    return response({
      statusCode: 400,
      status: 'fail',
      message: 'missing body request',
      res
    })
  }

  const findDuplicateEmail = await Users.findOne({ email })

  if (findDuplicateEmail !== null) {
    return response({
      statusCode: 409,
      status: 'fail',
      message: 'email alredy exist',
      res
    })
  }

  const findDuplicateUsername = await Users.findOne({ username })

  if (findDuplicateUsername !== null) {
    return response({
      statusCode: 409,
      status: 'fail',
      message: 'username alredy exist',
      res
    })
  }

  const hashPassword = await bcrypt.hash(password, 10)
  const user = new Users({ email, username, password: hashPassword })
  await user.save()

  return response({
    statusCode: 200,
    status: 'success',
    message: 'registration successfully',
    res
  })
}

export default signup
