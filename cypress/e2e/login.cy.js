/// <reference types="cypress" />

import loginPage from "../support/pages/login/index"
import shaversPage from "../support/pages/shavers"
import header from "../support/components/header"

import data from '../fixtures/users-login'

describe('Login', () => {

    context('Quando submeto o formulario', () => {
        it.only('deve logar com sucesso', () => {

            const user = data.success
            cy.createUser(user)

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)

            it('Não deve logar com senha incorreta', () => {
                const user = data.invpass
                const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

                loginPage.submit(user.email, user.password)
                loginPage.noticeShouldBe(message)


            })

            it('Não deve logar com email não cadastrado', () => {
                const user = data.email404
                const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

                loginPage.submit(user.email, user.password)
                loginPage.noticeShouldBe(message)

            })

            it('campos obrigatorios', () => {
                loginPage.submit()

                //     cy.contains('.alert-error', 'E-mail é obrigatório')

                //         .should('be.visible')

                //     cy.contains('.alert-error', 'Senha é obrigatória')
                //         .should('be.visible')


                //a estrategia abaixo é interessante para testes para poucos campos como o caso abaixo
                // lembrando se um item falhar o teste para

                loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')

            })


        })
        context('senha muito curta', () => {
            const passwords = data.shortpass

            passwords.forEach((p) => {
                const message = 'Pelo menos 6 caracteres'
                it(`não deve logar com a senha: ${p}`, () => {
                    loginPage.submit('papito@teste.com.br', p)
                    loginPage.alertMessageShouldBe(message)
                })
            })
        })


        context('email no formato incorreto', () => {
            const emails = data.invemails
            emails.forEach((e) => {
                const message = 'Informe um email válido'
                it(`não deve logar com o email: ${e}`, () => {
                    loginPage.submit(e, 123456)
                    loginPage.alertMessageShouldBe(message)
                })
            })
        })
    })
})
