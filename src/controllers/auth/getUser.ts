import { type Response } from 'express'
import response from '../../helpers/response'
import Users from '../../models/users'
import { type CustomeRequest } from '../../middlewares/authentication'
import { type User } from '../../types/Types'

const getUser = async (req: CustomeRequest, res: Response): Promise<Response> => {
  const { userId } = req.user

  const user: User | any = await Users.findOne({ _id: userId })
  const { id, email, username } = user

  return response({
    statusCode: 200,
    status: 'succes',
    data: {
      user: {
        id, email, username
      }
    },
    res
  })
}

export default getUser
