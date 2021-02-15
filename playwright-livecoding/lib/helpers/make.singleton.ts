function makeSingleton(PagePO, ctxPage) {

    if (PagePO.__instance) {
        PagePO.__instance._replacePage.call(PagePO.__instance, ctxPage)
        return PagePO.__instance
    }
    const page = new PagePO(ctxPage);

    PagePO.__instance = page;
    return PagePO.__instance
}

export {
    makeSingleton
}