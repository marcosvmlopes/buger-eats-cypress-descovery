var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {
    
    deliver: function () {

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()

        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: '31999999999',
            address: {
                postalcode: '32685036',
                street: 'Rua Itaú',
                number: '895',
                details: 'Casa de Esquina',
                district: 'Amazonas',
                city_state: 'Betim/MG'
            },
            delivery_method: 'Van/Carro',
            cnh: 'cnh-digital.jpg'
        }

        return data

    }
}