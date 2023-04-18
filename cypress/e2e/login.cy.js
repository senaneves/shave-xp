/// <reference types="cypress" />

require('dotenv').config()
// import loginPage from "../support/pages/views/login"
// import shaversPage from "../support/pages/views/shavers"
// import header from "../support/pages/components/header"
import data from '../fixtures/users-login'

describe('Login', () => {

    context('Quando submeto o formulario', () => {
        it.only('deve logar com sucesso', () => {

            const user = data.success
            cy.createUser(user)

            // loginPage.submit(user.email, user.password)
            cy.submitLogin(user.email, user.password)
            cy.userShouldBeLoggedIn(user.name)

            it('Não deve logar com senha incorreta', () => {
                const user = data.invpass
                const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

                // loginPage.submit(user.email, user.password)
                cy.submitLogin(user.email, user.password)
                // loginPage.shared.noticeShouldBe(message)
                cy.noticeShouldBe(message)


            })

            it('Não deve logar com email não cadastrado', () => {
                const user = data.email404
                const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

                // loginPage.submit(user.email, user.password)
                cy.submitLogin(user.email, user.password)
                // loginPage.shared.noticeShouldBe(message)
                cy.noticeShouldBe(message)

            })

            it('campos obrigatorios', () => {
                // loginPage.submit()
                cy.submitLogin()

                //não é necessário encapsular o requiredFields, pois ele não será 
                //utilizado em nenhum outro teste, porém criei o encapsulamento 
                //para praticar
                cy.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')

            })


        })
        context('senha muito curta', () => {
            const passwords = data.shortpass

            passwords.forEach((p) => {
                const message = 'Pelo menos 6 caracteres'
                it(`não deve logar com a senha: ${p}`, () => {
                    const host = process.env.DB_HOST
                    const user2 = process.env.DB_USER
                    const name2 = process.env.DB_NAME
                    const pass2 = process.env.DB_PASS
                    const port = process.env.DB_PORT
                    cy.log(host)
                    cy.log(name2)
                    cy.log(pass2)
                    cy.log(port)
                    cy.log(user2)

                    // loginPage.submit('papito@teste.com.br', p)
                    cy.submitLogin('papito@teste.com.br', p)
                    // loginPage.shared.alertMessageShouldBe(message)
                    cy.alertMessageShouldBe(message)
                })
            })
        })


        context('email no formato incorreto', () => {
            const emails = data.invemails
            emails.forEach((e) => {
                const message = 'Informe um email válido'
                it(`não deve logar com o email: ${e}`, () => {
                    // loginPage.submit(e, 123456)
                    cy.submitLogin(e, 123456)
                    // loginPage.shared.alertMessageShouldBe(message)
                    cy.alertMessageShouldBe(message)
                })
            })
        })
    })
})
