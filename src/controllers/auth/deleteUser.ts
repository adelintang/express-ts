import { type Response } from 'express'
import { type CustomeRequest } from '../../middlewares/authentication'
import response from '../../helpers/response'
import Users from '../../models/users'

const deleteUser = async (req: CustomeRequest, res: Response): Promise<Response> => {
  try {
    const { userId } = req.user
    const deletedUser = await Users.deleteOne({ _id: userId })

    if (deletedUser.deletedCount === 0) {
      return response({
        statusCode: 404,
        status: 'fail',
        message: 'user not found',
        res
      })
    }

    return response({
      statusCode: 200,
      status: 'success',
      message: 'deleted user successfully',
      res
    })
  } catch (error: any) {
    return response({
      statusCode: 500,
      status: 'fail',
      message: `${error.message}`,
      res
    })
  }
}

export default deleteUser
