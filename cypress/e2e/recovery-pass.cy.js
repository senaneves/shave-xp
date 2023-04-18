// import fpPage from '../support/pages/views/forgot-pass'
// import rpPage from '../support/pages/views/reset-pass'
// import loginPage from '../support/pages/views/login'
// import shaversPage from '../support/pages/views/shavers'

describe('esqueci minha senha', () => {

    it('deve poder solicitar o resgate de senha', () => {
        const user = {
            name: 'João Esquecido',
            email: 'joao@gmail.com',
            password: 'qax123',
            is_shaver: false
        }

        cy.createUser(user)

        // fpPage.go()
        // fpPage.submit(user.email)
        cy.requestPass(user.email)

        const message = 'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.'
        cy.noticeShouldBe(message)
    })

    context('Quando o usuario solicita resgate de senha', () => {
        const user = {
            name: 'Will Souza',
            email: 'will@gmail.com',
            password: 'qax123',
            is_shaver: false
        }

        beforeEach(() => {
            cy.createUser(user)
            cy.recoveryPass(user.email)
            cy.getToken(user.email)
        })

        it('deve cadastrar uma nova senha', () => {
            const message = 'Agora você já pode logar com a sua nova senha secreta.'
            // rpPage.go(Cypress.env('token'))
            cy.log(Cypress.env('token'))
            // rpPage.subimit('qax123','qax123')
            cy.resetPass(Cypress.env('token'), 'qax123', 'qax123')
            // rpPage.noticeShuoldBe(message)
            cy.noticeShouldBe(message)

        })
        afterEach(() => {
            cy.submitLogin(user.email, 'qax123')
            cy.userShouldBeLoggedIn(user.name)

        })
    })
})