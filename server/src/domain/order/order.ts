import Domain from "../domain";
import Customer from "../customer/customer";
import Product from "./product";
import EntityId from "../entityId";

class Order extends Domain {

    private id: EntityId | undefined;
    private customer: Customer
    private lineItems: Product[] | [] 

    getEntityId = () => this.id
    getLineItems = () => this.lineItems
    getCustomer = () => this.customer

    constructor(id: EntityId | undefined, customer: Customer, lineItems: Product[] | []) {
        super()
        if(id) {
            this.id = id
        } else {
            this.id = undefined 
        }
        this.customer = customer;
        this.lineItems  = lineItems
    }

    static createInitial(name: string, customer: Customer, lineItems: Product[] | []) {
        return new Order(undefined, customer, lineItems )
    }

    static create(id: EntityId, customer: Customer, lineItems: Product[] | []) {
        return new Order(id, customer, lineItems )
    }

    removeItem() {

    }

    addItem = (product: Product) => {
       return this.lineItems = [...this.lineItems, product]
    }

    cancel() {
            
    }

    getTotalPrice() {

    }


}

export default Order