class BaseFragment {
    page
    rootSelector
    constructor(page, rootFragmentSelector) {
        this.page = page;
        this.rootSelector = rootFragmentSelector
    }

    _replacePage(page) {
        const excludeProps = ['page', 'rootSelector', 'id']
        this.page = page
        const expectedProps = Object
            .getOwnPropertyNames(this)
            .filter(p => !excludeProps.includes(p))

        expectedProps.forEach((p) => {
            this[p]._replacePage.call(this[p], page)
        })
    }
}

export {
    BaseFragment
}