import EntityId from "../entityId";
import { Domain } from "domain";

class Manufacturer extends Domain {
   private id : EntityId | undefined
   private name: string
   
    getId = () => this.id;
    getName = () => this.name;

    constructor(id: EntityId | undefined, name: string) {
        super()
        this.id = id
        this.name= name
    }

    static createInitial(name: string) {
        return new Manufacturer(undefined, name)
    }

    static create(id: EntityId, name: string) {
        return new Manufacturer(id, name)
    }
}

export default Manufacturer