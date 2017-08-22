import { IDatabaseModel } from "./interface-database-model";
import { BaseModel } from "./base-model";

export class BaseDatabaseModel extends BaseModel implements IDatabaseModel {

    public async update(properties: object): Promise<any> {
        //do nothing, why? because the real function is from sequerize 
        return Promise.resolve();
    }
}