import EntityId from "../domain/entityId";
import Domain from "../domain/domain";

interface Repository {

    getOneById(id: EntityId) : Domain;
    getAll?() : [object];
    saveOne(domainModel :Domain) : void;
    insertOne(insertionOptions: any): void
}

export default Repository