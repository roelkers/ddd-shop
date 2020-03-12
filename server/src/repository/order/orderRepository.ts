import Repository from "../repository";
import EntityId from "../../domain/entityId";
import pgClient from '../../pgClient'
import Order from "../../domain/order/order";
import Customer from "../../domain/customer/customer";
import Product from "../../domain/order/product";
import { ProductRow } from "../product";
import Manufacturer from "../../domain/order/manufacturer";

export interface OrderRow {
    id: number,
    customer_id: number,
    creation_date: Date
}

class OrderRepository implements Repository {

    getOneById = async (id: EntityId) => {
        console.log(id)
        const [orderRows, customerRows, productRows] = await Promise.all([
            pgClient.query(`SELECT id, customer_id, creation_date FROM
            orders WHERE id=$1;`, [id.getId()]).catch((e:any) => console.log(e)),
            pgClient.query(`SELECT id, name, customer FROM
            customer WHERE id=$1;`, [id.getId()]).catch((e:any) => console.log(e)),
            pgClient.query(`SELECT product.name, product.price, product.id FROM
            product 
            INNER JOIN order_product ON order_product.product_id=product.id
            WHERE order_id=$1`, [id.getId()]).catch((e: any) => console.log(e))
        ])
        const orderRow = orderRows.rows[0]
        const customerRow = customerRows.rows[0]
        const customer = Customer.create(
            customerRow.id,
            customerRow.name
        )
        const products = productRows.rows.map((p: ProductRow) => {
            const manufacurerRow = pgClient.query(`SELECT id, name FROM manufacturer
                WHERE id=$1`, [p.manufacturer_id])
            const manufacturer = Manufacturer.create(new EntityId(manufacurerRow.id), manufacurerRow.name)
            return Product.create(
                new EntityId(p.id),
                p.price,
                p.name,
                manufacturer
            )
        })
        return Order.create(
            new EntityId(orderRow.id),
            customer,
            products
        )
    }

    saveOne = async (order: Order) => {
        await pgClient.query('BEGIN;') 
        const lineItems = order.getLineItems() as Product[]
        lineItems.map(async (product: Product) => {
            await pgClient.query(`INSERT INTO order_product(order_id,product_id) VALUES($1,$2) ON CONFLICT DO NOTHING;`,
            [order.getEntityId()?.getId(), product.getId()?.getId()])
        })
        await pgClient.query('COMMIT;')
    }

    insertOne = async (order: Order) => {
        await pgClient.query('BEGIN;') 
        await pgClient.query('INSERT INTO orders(customer_id, creation_date) VALUES ($1,$2);',
            [order.getCustomer().getId()?.getId(), new Date()]
        )
        const lineItems = order.getLineItems() as Product[]
        lineItems.map(async (product: Product) => {
            await pgClient.query(`INSERT INTO order_product(order_id,product_id) VALUES($1,$2);`,
            [order.getEntityId()?.getId()], product.getId()?.getId())
        })
        await pgClient.query('COMMIT;')
    }
}

export default OrderRepository