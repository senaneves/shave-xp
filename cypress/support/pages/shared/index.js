class SharedSteps {
    noticeShouldBe(expectdText) {
        cy.get('.notice p', { timeout: 10000 })
            .should('be.visible')
            .should('have.text', expectdText)
    }

    alertMessageShouldBe(message) {
        cy.get('.alert-error')
            .should('be.visible')
            .should('have.text', message)
    }

}

export default new SharedSteps()