import Domain from "../domain";
import { ShipmentStatus } from "./status";

class Shipment extends Domain {

    private status: ShipmentStatus

    constructor() {
        super()
        this.status = ShipmentStatus.Pending;
    }

    fulfill() {

    }

    return () {

    }
}

export default Shipment