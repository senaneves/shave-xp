/// <reference types="cypress" />

import loginPage from "../support/pages/views/login"
import shaversPage from "../support/pages/views/shavers"
import data from '../fixtures/order.json'
import catalogPage from '../support/pages/views/catalog'
import OrderPage from '../support/pages/views/order'

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

            shaversPage.selectSharver(shaver.name)
            catalogPage.hasShaver(shaver.name)

            catalogPage.selectService(service.description)
            catalogPage.hasTitle(service.description)
            
            catalogPage.confirmOrder()
            OrderPage.hasOrder()
            



        })
    })





})