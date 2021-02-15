describe('Locating elements', () => {

    beforeEach(() => {
        cy.visit('http://demo.automationtesting.in/Register.html')
    })

    it('Checkboxes', () => {
        cy.get('#checkbox1').check().should('be.checked').and('have.value', 'Cricket')
        cy.get('#checkbox2').check().should('be.checked').and('have.value', 'Movies')
        cy.get('#checkbox3').check().should('be.checked').and('have.value', 'Hockey')

        cy.get('#checkbox1').uncheck().should('not.be.checked')
        cy.get('#checkbox2').uncheck().should('not.be.checked')
        cy.get('#checkbox3').uncheck().should('not.be.checked')

        cy.get('input[type="checkbox"]').check(['Cricket', 'Hockey'])

    })

    it('Dropdown', () => {
        cy.get('#Skills').select('Android').should('have.value', 'Android')
    })

    it('Multiselect', () => {
        cy.xpath('//div[@id="msdd"]').click()
        // cy.get('#msdd').click()
        cy.get('.ui-corner-all').contains('English').click()
        cy.get('.ui-corner-all').contains('Japanese').click()
    })

    it.only('Dropdown', () => {
        cy.get('[role="combobox"]').click({force: true})
        cy.get('.select2-search__field').type('India').type('{enter}')

    })
})