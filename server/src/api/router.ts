import express from 'express'
import orderApi from './order'

const router = express.Router()

router.use('/order' , orderApi)

export default router