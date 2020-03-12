import Repository from "../repository";
import pgClient from '../../pgClient'
import EntityId from "../../domain/entityId";
import Customer from "../../domain/customer/customer";

export interface customerRow {
    id: number,
    name: string
}

class CustomerRepository implements Repository {

    getOneById = async (entityId : EntityId) : Promise<Customer> => {
        const rows = await pgClient.query(`SELECT id, name FROM
            customer WHERE id=$1;`, [entityId.getId()]).catch((e: any) => console.log(e))
        const customerRow = rows.rows[0]
        return new Customer(
            customerRow.id,
            customerRow.name
        )
    }

    insertOne(customer: Customer){
        return pgClient.query(`INSERT INTO customer(name) VALUES
        ($1);`,[customer.getName()] 
        )
    }

    saveOne(customer: Customer) {
        return pgClient.query(`UPDATE customer SET 
        name=$1 WHERE id=$2;`,[name, customer.getId()] 
        )
    }
}

export default CustomerRepository