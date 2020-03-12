import express from 'express'
import OrderApplicationService from '../../application/order'
import EntityId from '../../domain/entityId'

const router = express.Router()

router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    const idNumber = parseInt(id) 
    if(typeof idNumber !== 'number')
        return res.status(400).send('id must be a number')
    const orderApplicationService = new OrderApplicationService()
    const order = await orderApplicationService.getById(idNumber)
    res.send(order)
})

router.post('/', async (req, res, next) => {
   const { customer_id } = req.body 
    const idNumber = parseInt(customer_id) 
    if(typeof idNumber !== 'number')
        return res.status(400).send('id must be a number')
   const orderApplicationService = new OrderApplicationService()
   await orderApplicationService.create(new EntityId(idNumber))
   res.sendStatus(200)
})

router.post('/product', async (req, res, next) => {
    const { orderId, productId } = req.body
    const idNumber = parseInt(orderId) 
    if(typeof idNumber !== 'number')
        return res.status(400).send('id must be a number')
    const productIdNumber = parseInt(productId) 
    if(typeof productIdNumber !== 'number')
        return res.status(400).send('product id must be a number')
   const orderApplicationService = new OrderApplicationService()
   await orderApplicationService.addProductToOrder(new EntityId(idNumber), new EntityId(productIdNumber))
   return res.sendStatus(200)
})

export default router