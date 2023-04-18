Cypress.Commands.add('noticeShouldBe', (expectdText) => {
    cy.get('.notice p', { timeout: 10000 })
        .should('be.visible')
        .should('have.text', expectdText)
})

Cypress.Commands.add('alertMessageShouldBe', (message) =>{
    cy.get('.alert-error')
            .should('be.visible')
            .should('have.text', message)
})