import Repository from "../repository";
import pgClient from '../../pgClient'
import EntityId from "../../domain/entityId";
import Product from "../../domain/order/product";
import Manufacturer from "../../domain/order/manufacturer";

export interface ProductRow {
    id: number,
    name: string,
    price: number,
    manufacturer_id : number
}

class ProductRepository implements Repository {

    getOneById = async (entityId : EntityId) => {
        const productRows = await pgClient.query(`SELECT id, name, price, manufacturer_id FROM
            product WHERE id=$1;`, [entityId.getId()])
        const productRow = productRows.rows[0]
        const manufacturerRow = pgClient.query(`SELECT id, name FROM manufacturer
                WHERE id=$1`, [productRow.manufacturer_id])
        const manufacturer = Manufacturer.create(new EntityId(manufacturerRow.id), manufacturerRow.name)
        return Product.create(
            new EntityId(productRow.id),
            productRow.price,
            productRow.name,
            manufacturer
        )
    }

    insertOne(product: Product){
        return pgClient.query(`INSERT INTO product(name, manufacturer, price) VALUES
        ($1,$2,$3)`,[product.getName(), product.getManufacturer().getId(), product.getPrice()] 
        )
    }

    saveOne(product: Product) {
        return pgClient.query(`UPDATE customer SET 
        name=$1 WHERE id=$2`,[product.getName(), product.getId()] 
        )
    }
}

export default ProductRepository