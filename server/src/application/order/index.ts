import OrderRepository from "../../repository/order/orderRepository";
import ApplicationService from "../applicationService";
import EntityId from "../../domain/entityId";
import Order from "../../domain/order/order";
import CustomerRepository from "../../repository/customer";
import ProductRepository from "../../repository/product";

class OrderApplicationService implements ApplicationService {

    getById = async (id : number) => {
        const orderRepository = new OrderRepository()
        const order = await orderRepository.getOneById(new EntityId(id))
        return order 
    }

    create = async (customerId: EntityId) => {
        const orderRepository = new OrderRepository()
        const customerRepository = new CustomerRepository()
        const customer = await customerRepository.getOneById(customerId) 
        const order = new Order(undefined, customer, [])
        return orderRepository.insertOne(order)
    }

    addProductToOrder = async (orderId: EntityId, productId: EntityId) => {
        const orderRepository = new OrderRepository()
        const productRepository = new ProductRepository()
        const order = await orderRepository.getOneById(orderId)
        const product = await productRepository.getOneById(productId)
        order.addItem(product)
        await orderRepository.saveOne(order)
    }
}

export default OrderApplicationService