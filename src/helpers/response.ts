import { type Response } from 'express'
import { type ResponseType } from '../types/Types'

const response = ({ statusCode, status, message, data, res }: ResponseType): Response => {
  return res.status(statusCode).json({
    status,
    message,
    data
  })
}

export default response
