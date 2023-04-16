class ForgotPassPage {

    go() {
        cy.visit('/forgot-password')
        cy.get('form h1').should('have.text', 'Recuperar senha')
    }

    submit(email) {

        cy.get('input[placeholder$=mail]')
            .type(email)

        cy.contains('button', 'Recuperar')
            .click()

    }
    noticeShuoldBe(message) {
        cy.get('.notice p', {timeout: 10000}) //incluido o timeout de 10s apenas para esse validação
            .should('be.visible')
            .should('have.text', message)
    }

}

export default new ForgotPassPage()