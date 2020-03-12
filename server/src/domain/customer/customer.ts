import { Domain } from "domain";
import EntityId from "../entityId";

class Customer extends Domain {

    private id: EntityId | undefined;
    private name: string;

    getId = () => this.id
    getName = () => this.name

    constructor(id: number | undefined, name: string) {
        super()
        if(id) {
            this.id = new EntityId(id) 
        } else {
            this.id = undefined 
        }
        this.name = name;
    }


    static createInitial(name: string) {
        return new Customer(undefined, name)
    }

    static create(id: number, name: string) {
        return new Customer(id, name)
    }
}

export default Customer