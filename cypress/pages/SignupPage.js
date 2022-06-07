class SignupPage {

    go() {
        cy.visit('/')

        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    fillForm(delivery) {
        cy.get('input[placeholder="Nome completo"]').type(delivery.name)
        cy.get('input[placeholder="CPF somente números"]').type(delivery.cpf)
        cy.get('input[placeholder="E-mail"]').type(delivery.email)
        cy.get('input[placeholder="Whatsapp"]').type(delivery.whatsapp)

        cy.get('input[name="postalcode"]').type(delivery.address.postalcode)
        cy.get('input[type="button"][value="Buscar CEP"] ').click()

        cy.get('input[placeholder="Número"]').type(delivery.address.number)
        cy.get('input[placeholder="Complemento"]').type(delivery.address.details)

        cy.get('input[name="address"]').should('have.value', delivery.address.street)
        cy.get('input[name="district"]').should('have.value', delivery.address.district)
        cy.get('input[name="city-uf"]').should('have.value', delivery.address.city_state)

        cy.contains('.delivery-method li ', delivery.delivery_method).click()
        cy.get('.dropzone input[accept^="image"]').attachFile('/imagens/' + delivery.cnh)
    }

    submit() {
        cy.get('form button[type="submit"]').click()
    }

    modalContentShouldBe(expectedMessage) {
        cy.get('.swal2-container .swal2-html-container')
            .should('have.text', expectedMessage)
    }

    alertMessageShouldBe(expectedMessage) {
        // cy.get('.alert-error')
        // .should('have.text', expectedMessage)

        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }
}

export default new SignupPage;