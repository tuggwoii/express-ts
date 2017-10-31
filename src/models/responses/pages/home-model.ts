import { IPageModel } from "./page-model-interface";

export class HomeModel implements IPageModel {

    public title: string;

    constructor(data?: any) {
        if (data) {
            this.title = data.title;
        }
    }
}