import { BaseModel } from "../../base/base-model";
import { IBaseModel } from "../../base/interface-base-model";

export class Response extends BaseModel implements IBaseModel {

    public data: any;

    public errors: Array<string>;

    public meta: any;

    constructor(data?: any) {
        super(data);
    }

    public cast(data: any): void {
        this.data = data.data;
        this.errors = data.errors;
        this.meta = data.meta;
    }

}