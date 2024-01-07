import { type Response } from 'express'
import bcrypt from 'bcrypt'
import response from '../../helpers/response'
import Users from '../../models/users'
import { type CustomeRequest } from '../../middlewares/authentication'
import { type User, type UpdateUserReq } from '../../types/Types'

const updateUser = async (req: CustomeRequest, res: Response): Promise<Response> => {
  const { userId } = req.user
  const { email, username, oldPassword, newPassword }: UpdateUserReq = req.body

  const bodyRequest = Boolean(email) || Boolean(username) || Boolean(oldPassword) || Boolean(newPassword)
  const emailOrUsernameReq = Boolean(email) || Boolean(username)

  if (!bodyRequest) {
    return response({
      statusCode: 400,
      status: 'fail',
      message: 'require at least one or two body property',
      res
    })
  }

  if (emailOrUsernameReq) {
    try {
      const updatedEmailUsername: User | any = await Users.findByIdAndUpdate(userId, { $set: { email, username } }, { new: true })
      const { _id: id, email: newEmail, username: newUsername } = updatedEmailUsername

      return response({
        statusCode: 200,
        status: 'success',
        data: {
          user: {
            id,
            email: newEmail,
            username: newUsername
          }
        },
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

  const passwordExistInReq = Boolean(oldPassword) && Boolean(newPassword)

  if (!passwordExistInReq) {
    return response({
      statusCode: 400,
      status: 'fail',
      message: 'old password and new password required',
      res
    })
  }

  const foundUser: User | any = await Users.findOne({ _id: userId })
  const isMatchOldPassword = await bcrypt.compare(oldPassword as string, foundUser.password)

  if (!isMatchOldPassword) {
    return response({
      statusCode: 400,
      status: 'fail',
      message: 'old password not match',
      res
    })
  }

  const hashPassword = await bcrypt.hash(newPassword as string, 10)
  const updatedPassword: User | any = await Users.findByIdAndUpdate(userId, { $set: { password: hashPassword } }, { new: true })

  return response({
    statusCode: 200,
    status: 'success',
    message: 'password changed successfully',
    data: {
      user: {
        id: updatedPassword?.id
      }
    },
    res
  })
}

export default updateUser
