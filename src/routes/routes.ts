import express from 'express'
import signup from '../controllers/auth/signup'
import signin from '../controllers/auth/signin'
import getUser from '../controllers/auth/getUser'
import updateUser from '../controllers/auth/updateUser'
import deleteUser from '../controllers/auth/deleteUser'
import authentication from '../middlewares/authentication'

const router: express.Router = express.Router()

router.post('/api/v1/signup', signup)
router.post('/api/v1/signin', signin)
router.get('/api/v1/user', authentication, getUser)
router.patch('/api/v1/user', authentication, updateUser)
router.delete('/api/v1/user', authentication, deleteUser)

export default router
