import Domain from "../domain";
import EntityId from "../entityId";
import Manufacturer from "./manufacturer";

class Product extends Domain {

    private id: EntityId | undefined 
    private price: number
    private name: string
    private manufacturer: Manufacturer

    getId = () => this.id;
    getName = () => this.name;
    getPrice = () => this.price;
    getManufacturer = () => this.manufacturer;

    constructor(id: EntityId | undefined, price: number, name: string, manufacturer: Manufacturer) {
        super()
        if(price < 0) throw new Error('Price must larger than 0.')
        this.price = price;
        if(id) {
            this.id = id
        } else {
            this.id = undefined 
        }
        this.id = id
        this.name= name
        this.manufacturer= manufacturer
    }

    static createInitial(price: number, name: string, manufacturer: Manufacturer) {
        return new Product(undefined, price, name, manufacturer)
    }

    static create = (id: EntityId, price: number, name: string, manufacturer: Manufacturer) => {
        return new Product(id, price, name, manufacturer)
    }
}

export default Product