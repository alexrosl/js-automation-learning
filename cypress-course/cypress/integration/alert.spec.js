describe('Locating elements', () => {
    it('Alert', () => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        cy.get('.example li:nth-child(1) button').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('I am a JS Alert')
        })
    })

    it('Alert confirm', () => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        cy.get('.example li:nth-child(2) button').click()
        cy.on('window:confirm', (str) => {
            expect(str).to.equal('I am a JS Confirm')
        })
    })

})