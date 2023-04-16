import shared from "../../shared"

class LoginPage {

    constructor() {
        this.alertError = '.alert-error'
        this.shared = shared
    }
    submit(email = null, password = null) {


        cy.visit('/')

        // criando um alias para email e password. Para garantir que o elemtno foi acionado 
        // dessa forma garante-se que os campos de fato existem e estão visíveis

        cy.get('input[placeholder*=email]').as('email')
        cy.get('input[placeholder*=senha]').as('password')

        if (email) {
            cy.get('@email').type(email)
        }
        if (password) {
            cy.get('@password').type(password)
        }

        cy.contains('button', 'Entrar')
            .click()
    }

    // noticeSuccessShouldBe(message) {
    //     cy.get('.notice-container')
    //         .should('be.visible')
    //         .find('.error p')
    //         .should('have.text', message)
    // }

    // noticeShouldBe(expectdText) {
    //     cy.get('.notice p', { timeout: 10000 })
    //         .should('be.visible')
    //         .should('have.text', expectdText)
    // }

    // alertMessageShouldBe(message) {
    //     cy.get(this.alertError)
    //         .should('be.visible')
    //         .should('have.text', message)
    // }

    requiredFields(emailMessage, senhaMessage) {
        cy.get(this.alertError)
            .should('have.length', 2)
            .and(($small) => {
                expect($small.get(0).textContent).to.equal(emailMessage)
                expect($small.get(1).textContent).to.equal(senhaMessage)
            })
    }
}


export default new LoginPage()