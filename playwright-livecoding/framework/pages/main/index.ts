import {HeaderFragment} from './fragments/header'
import {LoginFragment} from './fragments/login'
import {RegisterFragment} from './fragments/register'
import {decoratePage, BasePage} from '../../../lib'

class MainPage extends BasePage{
    private loginFragment: LoginFragment;
    private registerFragment: RegisterFragment;
    private headerFragment: HeaderFragment;
    constructor(page, pageRootSelector = '#main_page') {
        super(page, pageRootSelector)
        this.loginFragment = new LoginFragment(page)
        this.registerFragment = new RegisterFragment(page)
        this.headerFragment = new HeaderFragment(page)

    }

    async login(username, password) {
        await this.headerFragment.toLogin()
        await this.loginFragment.login(username, password)
    }

    async register(name, username, email, password) {
        await this.headerFragment.toRegister()
        await this.registerFragment.register(name, username, email, password)
    }
}

export {
    MainPage
}