class ResetPassPage {

    go(token) {
        cy.visit('/reset-password?token=' + token)
        cy.get('form h1')
            .should('have.text', 'Resetar senha')

    }

    subimit(newPass, confirmNewPass) {
        cy.get('input[placeholder="Nova senha"]')
            .type(newPass)
        cy.get('input[placeholder="Confirmação da senha"]')
            .type(confirmNewPass)
        cy.contains('button', 'Alterar senha')
            .click()

    }

    noticeShuoldBe(message) {
        cy.get('.notice p', {timeout: 10000}) //incluido o timeout de 10s apenas para esse validação
            .should('be.visible')
            .should('have.text', message)
    }

}

export default new ResetPassPage()