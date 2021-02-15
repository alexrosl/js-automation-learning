describe('Fixture', () => {
    let testData

    before(() => {
        cy.fixture('testdata/example').then(function(data) {
            testData = data
        })
    })

    it('fixture test', () => {
        cy.visit('https://admin-demo.nopcommerce.com/login')

        // cy.fixture('testdata/example').as('testData')
        cy.log(JSON.stringify(testData))
        cy.get('input[name=Email]').clear().type(testData.email)
        cy.get('input[name=Password]').clear().type(testData.password)
        cy.get('input[type=submit]').click()

    })

})