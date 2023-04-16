import header from "../../components/header"

class ShavesPage {

    constructor() {
        this.header = header
    }
        selectSharver(name){
            cy.contains('figcaption h3', name)
                .should('be.visible')
                .click()
        }

}

export default new ShavesPage()