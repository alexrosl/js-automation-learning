import {MainPage, TablesPage} from './pages'
import {makeSingleton, Browser} from '../lib'

const pageProvider = (page) => {
    return {
        main: (): MainPage => makeSingleton(MainPage, page),
        tables: (): TablesPage => makeSingleton(TablesPage, page)
    }
}

const provider = {
    browser: new Browser()
}

export {
    pageProvider,
    provider
}