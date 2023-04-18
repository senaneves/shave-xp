/// <reference types="cypress" />
// import loginPage from "../support/pages/views/login"
// import shaversPage from "../support/pages/views/shavers"
// import catalogPage from '../support/pages/views/catalog'
// import OrderPage from '../support/pages/views/order'
import data from '../fixtures/order.json'

describe('pedido', () => {

    context('usuario logado', () => {

        const { customer, shaver, service } = data

        before(() => {

            const user = data.customer

            cy.createUser(customer)
            //cy.uiLogin(customer)
            cy.apiLogin(customer)

        })

        it('deve pode soliciatar serviços', () => {
            // shaversPage.selectSharver(shaver.name)
            // catalogPage.hasShaver(shaver.name)
            // catalogPage.selectService(service.description)
            // catalogPage.hasTitle(service.description)
            // catalogPage.confirmOrder()
            // OrderPage.hasOrder()
            cy.selectSharver(shaver.name)
            // cy.hasShaver(shaver.name) - essa funcionalidade foi incluida já no
            // select shaver e já faz a verificação

            cy.selectService(service.description)
            // cy.hasTitle(service.description) -  também foi incluidad no select service

            cy.confirmOrder()
            // cy.hasOrder() - incluida em confirOrder
        })
    })
})