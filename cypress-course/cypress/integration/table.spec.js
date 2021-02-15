describe('Table', () => {
    it('table test', () => {
        cy.visit('http://testautomationpractice.blogspot.com/')

        cy.get('table[name="BookTable"]')
            .contains('td', 'Learn Selenium')
            .should('be.visible')

        cy.get('table[name="BookTable"]')
            .find('tr:nth-child(2)')
            .find('td:nth-child(3)')
            .contains('Selenium')
            .should('be.visible')

        cy.get('table[name="BookTable"] tr td:nth-child(2)')
            .each((element, index, $list) => {
                const text = element.text()
                if (text.includes('Amod')) {
                    cy.get('table[name="BookTable"] tr td:nth-child(1)')
                        .eq(index)
                        .then((book) => {
                            const bookName = book.text()
                            expect(bookName).to.equal("Master In Java")
                        })
                }
            })
    })

})