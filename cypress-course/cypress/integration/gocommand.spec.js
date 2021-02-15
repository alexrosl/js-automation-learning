describe('Go command', () => {
    it('Goo', () => {
        cy.visit('https://demo.nopcommerce.com')
        cy.title().should('eq', 'nopCommerce demo store')

        cy.get('.ico-register').contains('Register').click()
        cy.title().should('eq', 'nopCommerce demo store. Register')

        cy.go('back')
        cy.title().should('eq', 'nopCommerce demo store')

        cy.go(1)
        cy.title().should('eq', 'nopCommerce demo store. Register')

        cy.reload()
    })

})