/// <reference types="cypress" />

import loginPage from "../support/pages/login/index"
import shaversPage from "../support/pages/shavers"
import data from '../fixtures/order.json'
import catalogPage from '../support/pages/catalog'
import OrderPage from '../support/pages/order'

describe('pedido', () => {

    context('usuario logado', () => {

        const { customer, shaver, service } = data

        before(() => {

            const user = data.customer

            cy.createUser(customer)

            loginPage.submit(customer.email, customer.password)
            shaversPage.header.userShouldBeLoggedIn(customer.name)
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