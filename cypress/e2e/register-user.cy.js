// import signUpPage from '../support/pages/views/signup'
// import loginPage from '../support/pages/views/login'
// import shaversPage from '../support/pages/views/shavers'
import data from '../fixtures/users-register.json'

describe('Cadastrar usuário', () => {

    context('Quando realizar o cadastro de usuario', () => {

        const user = data.user3
        it.only('deve realizar cadastro de usuário com sucesso', () => {
            const message = 'Boas vindas, faça login para solicitar serviços!'
            cy.deleteUser(user)
            cy.signUp(user.name, user.email, user.password)
            cy.noticeShouldBe(message)
        })

        afterEach(() => {

            // loginPage.submit(user.email, user.password)
            // shaversPage.header.userShouldBeLoggedIn(user.name)
            cy.submitLogin(user.email, user.password)
            cy.userShouldBeLoggedIn(user.name)
        })
    })


    it('não deve cadastrar usuário com e-mail em duplicidade', () => {
        const user = data.user3

        cy.createUser(user)

        cy.signUp(user.name, user.email, user.password)

        const message = 'Oops! E-mail já cadastrado.'
        cy.noticeShouldBe(message)
    })

    it('campos obrigatórios', () => {

        cy.signUp()
        cy.get('.alert-error')
            .should('have.length', 3)
            .and(($small) => {
                expect($small.get(0).textContent).to.equal('Nome é obrigatório')
                expect($small.get(1).textContent).to.equal('E-mail é obrigatório')
                expect($small.get(2).textContent).to.equal('Senha é obrigatória')
            })

    })

    context('Email inválido', () => {
        data.invemails.forEach((e) => {
            it(`não deve realizar o cadastro com email inválido: ${e}`, () => {

                cy.signUp('QaxTeste1', e, 'qax123')
                cy.alertMessageShouldBe('Informe um email válido')
            })
        })
    })

    context('Senha muito curta', () => {
        data.shortpass.forEach((p) => {
            it(`não deve realizar o cadastro com senha inválida: ${p}`, () => {

                cy.signUp('QaxTeste1', 'qax@qax.com', p)
                cy.alertMessageShouldBe('Pelo menos 6 caracteres')
            })
        })
    })
})