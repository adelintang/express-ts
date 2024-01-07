import { type Response } from 'express'

export interface ResponseType {
  statusCode: number
  status: string
  message?: string
  data?: any
  res: Response
}

export interface UserRequest {
  email: string
  username?: string
  password: string
}

export interface User {
  id: string
  email: string
  username: string
  password: string
}

export interface UpdateUserReq {
  email?: string
  username?: string
  oldPassword?: string
  newPassword?: string
}
