import { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import response from '../helpers/response'

export interface CustomeRequest extends Request {
  user?: UserType | any
}

interface UserType {
  userId: string
}

const authentication = (req: CustomeRequest, res: Response, next: NextFunction): void => {
  try {
    const token: string = req.headers.authorization as string

    if (token === undefined) {
      throw Error('empty token')
    }

    const accessToken = token.split(' ')[1]
    const ACCESS_TOKEN: string = process.env.ACCESS_TOKEN as string

    jwt.verify(accessToken, ACCESS_TOKEN, (error, user) => {
      if (error != null) throw error

      req.user = user
      next()
    })
  } catch (error: any) {
    response({
      statusCode: 401,
      status: 'fail',
      message: `${error.message}`,
      res
    })
  }
}

export default authentication
