describe('Custom commands', () => {

    it.only('login test', () => {
        cy.login('admin@yourstore.com', 'admin')
        cy.title().should('be.equal', 'Dashboard / nopCommerce administration')

        cy.login('admin@yourstore.com', 'admin12')
        cy.title().should('be.equal', 'Your store. Login')
    })

    it('Add customer test', () => {
        cy.login('admin@yourstore.com', 'admin')

        // Add customer
        cy.log('adding customer')
    })

    it('Edit customer test', () => {
        cy.login('admin@yourstore.com', 'admin')

        // Add customer
        cy.log('editing customer')
    })
})