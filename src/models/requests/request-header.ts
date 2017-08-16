import { BaseModel } from "../base/base-model";
import { IBaseModel } from "../base/interface-base-model";

export class RequestHeader extends BaseModel implements IBaseModel {

    public host: string;

    public connection: string;

    public authorization: string;

    public contentType: string;

    public acceptEncoding: string;

    public cookie: string;

    constructor(data?: any) {
        super(data);
    }

    public cast(data: any): void {
        this.host = data['host'];
        this.connection = data['connection'];
        this.authorization = data['authorization'];
        this.contentType = data['content-type'];
        this.acceptEncoding = data['accept-encoding'];
        this.cookie = data['cookie'];
    }
}