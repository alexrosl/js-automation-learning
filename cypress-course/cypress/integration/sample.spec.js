describe('My First Test', () => {
    it('Verify title positive', () => {
        cy.viewport(1200, 700)
        cy.visit('http://demo.nopcommerce.com/')
        cy.title().should('eq', 'nopCommerce demo store')

        cy.get('.ico-login')
            .click()
            .debug()
    })

    it('Verify title negative', () => {
        cy.visit('http://demo.nopcommerce.com/')
        cy.title().should('eq', 'nopCommerce store')
    })
})