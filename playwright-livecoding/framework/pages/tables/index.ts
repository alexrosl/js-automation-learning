import {decoratePage, BasePage, $element} from '../../../lib'

class TablesPage extends BasePage{
    header;
    constructor(page, pageRootSelector = '#table_page') {
        super(page, pageRootSelector)
        this.header = $element(this.page, '.header h3')
    }

    async getPageHeaderTitleContent() {
        return await this.header.textContent();
    }
}


export {
    TablesPage
}