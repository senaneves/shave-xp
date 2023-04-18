Cypress.Commands.add('submitLogin', (email = null, password = null) => {

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
})

Cypress.Commands.add('userShouldBeLoggedIn', (name) => {

    //necessário incluir a constante primeiro nome 
    //porque quando logado, aparece apenas o nome e não o nome completo
    //dessa forma o teste quebra
    // exemplo na massa o nome aparece "will souza" porém na aplicacao espera apenas "will"
    //por isso é necessario usar o split para separar as strings e pegar o vetor da 1 posicao
    const firstName = name.split(' ')[0]

    cy.get('.logged-user div a')
        .should('be.visible')
        .should('have.text', 'Olá, ' + firstName)
})


Cypress.Commands.add('requiredFields', (emailMessage, senhaMessage) => {
    cy.get('.alert-error')
        .should('have.length', 2)
        .and(($small) => {
            expect($small.get(0).textContent).to.equal(emailMessage)
            expect($small.get(1).textContent).to.equal(senhaMessage)
        })
})

Cypress.Commands.add('requestPass', (email) => {
    cy.visit('/forgot-password')

    cy.get('form h1')
        .should('have.text', 'Recuperar senha')

    cy.get('input[placeholder$=mail]')
        .type(email)

    cy.contains('button', 'Recuperar')
        .click()

})

Cypress.Commands.add('resetPass', (token, newPass, confirmNewPass) => {
    cy.visit('/reset-password?token=' + token)

    cy.get('form h1')
        .should('have.text', 'Resetar senha')

    cy.get('input[placeholder="Nova senha"]')
        .type(newPass)

    cy.get('input[placeholder="Confirmação da senha"]')
        .type(confirmNewPass)

    cy.contains('button', 'Alterar senha')
        .click()
})
