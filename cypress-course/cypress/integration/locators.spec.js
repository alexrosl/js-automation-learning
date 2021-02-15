describe('Locating elements', () => {
    it('Verify types of locators', () => {



        cy.visit('https://demo.nopcommerce.com')
        cy.url().should('include', 'nopcommerce')
        cy.url().should('not.include', 'incorrect')

        cy.get('#small-searchterms').should('be.visible').should('be.enabled').type('Apple MacBook Pro 13-inch')
        cy.get("[type='submit']").click()

        cy.get(".product-box-add-to-cart-button[value='Add to cart']").click()
        cy.get('#product_enteredQuantity_4').clear().type('2')
        cy.get('#add-to-cart-button-4').click()

        cy.wait(5000)

        cy.title().should('eq', 'nopCommerce demo store. Apple MacBook Pro 13-inch')


        cy.intercept({
            method: "POST",
            url: "https://demo.nopcommerce.com/shoppingcart/checkoutattributechange?isEditable=True",
        }).as("waitForProductToAdd");
        cy.get('#topcartlink .cart-label').click()

        cy.wait("@waitForProductToAdd");

        cy.get('.product-unit-price').contains('$1,800.00')
    })
})