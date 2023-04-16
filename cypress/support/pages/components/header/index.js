class Header {

    userShouldBeLoggedIn(name) {
        //necessário incluir a constante primeiro nome 
        //porque quando logado, aparece apenas o nome e não o nome completo
        //dessa forma o teste quebra
        // exemplo na massa o nome aparece "will souza" porém na aplicacao espera apenas "will"
        //por isso é necessario usar o split para separar as strings e pegar o vetor da 1 posicao
        const firstName = name.split(' ')[0]

        cy.get('.logged-user div a')
            .should('be.visible')
            .should('have.text', 'Olá, ' + firstName)
    }

}

export default new Header()