import { IPageBase } from "./base/interface-page-base";
import { PageBase } from "./base/page-base";

class IndexPage extends PageBase implements IPageBase {

    public url: string = '/';

    public view: string = 'static/views/pages/index.html';
}

let index = new IndexPage();

export = index;