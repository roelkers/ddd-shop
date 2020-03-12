import ValueObject from "./valueObject";

class EntityId implements ValueObject {

    private id: number;

    getId = () => this.id

    constructor(id: number) {
        this.id = id
    }

    equals(object: object) {
        if(object.constructor.name === 'EntityId') {
            const otherProductId = object as EntityId
            if(otherProductId.id === this.id) 
                return true
        }
        return false
    }
}

export default EntityId;