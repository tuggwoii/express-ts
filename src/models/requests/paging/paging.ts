import { BaseModel } from "../../base/base-model";
import { IBaseModel } from "../../base/interface-base-model";

export class Paging extends BaseModel implements IBaseModel {

    public page: number;

    public limit: number;

    public totalPage: number;

    public totalRecord: number;

    public offset: number;

    public cast(data: any) {
        this.page = parseInt(data.page);
        this.limit = parseInt(data.limit);
        this.totalPage = parseInt(data.totalPage);
        this.totalRecord = parseInt(data.totalRecord);
        this.offset = parseInt(data.offset);
    }

    public calculate(totalRecord: number) {
        this.totalRecord = totalRecord;
        if (!this.totalRecord || isNaN(this.totalRecord)|| this.totalRecord < 0) {
            this.totalRecord = 0;
        }
        if (!this.limit || isNaN(this.limit) || this.limit < 0) {
            this.limit = 20;
        }
        if (!this.page || isNaN(this.page) || this.page < 1) {
            this.page = 1;
        }
        if (!this.totalPage || isNaN(this.totalPage) || this.totalPage < 1) {
            this.totalPage = 1;
        }
        if (!this.offset || isNaN(this.offset) || this.offset < 0) {
            this.offset = 0;
        }
        if (this.totalRecord > 0) {
            this.totalPage = Math.ceil(this.totalRecord / this.limit);
        }
        if (this.page > this.totalPage) {
            this.page = this.totalPage;
        }
        if (this.page > 1) {
            this.offset = (this.page - 1) * this.limit;
        }
    }
}