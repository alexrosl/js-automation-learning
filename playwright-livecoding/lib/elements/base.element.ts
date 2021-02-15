import {waits} from '../helpers'
import * as chalk from 'chalk'
import {allureInterfaceStep} from "../page.conditions";
import {ALL} from "dns";

const {ALLURE} = process.env

class BaseElement {
    page
    selector
    currentElement
    id
    constructor(page, selector, elementName?) {
        this.page = page
        this.selector = selector
        this.currentElement = null
        this.id = elementName
    }

    _replacePage(page) {
        this.page = page
        this.currentElement = null
    }

    async initThisElement() {
        await waits(this.page).waitVisibility(this.selector)
        if (this.currentElement) {
            return this.currentElement
        }
        const el = await this.page.$(this.selector)
        this.currentElement = el
        return this.currentElement
    }
}

function $element(page, selector, elementName?) {
    const baseEl = new BaseElement(page, selector, elementName)
    return new Proxy(baseEl, {
        get(_t, value: string) {
            if (value === '_replacePage') {
                return (page) => baseEl._replacePage(page)
            }
            return (...args) => baseEl.initThisElement().then((curEl) => {
                if(!baseEl.id) {
                    baseEl.id = `BaseElement`
                }
                let message = `\t${baseEl.id} execute ${value}`
                if (args.length) {
                    message = `${message} with arguments ${JSON.stringify(args)}`
                }

                if (ALLURE) {
                    return allureInterfaceStep(message, curEl[value].bind(curEl, ...args))
                }


                console.log(chalk.green(message))
                return curEl[value].call(curEl, ...args)
            })
        }
    });
}

export {
    $element
}