function waits(page) {
    return {
        waitVisibility: (selector) => page.waitForSelector(selector, {state: 'attached', timeout: 1000})
    }
}

export {
    waits
}