import signup from '../pages/SignupPage'
import sigupFactory from '../factories/SignupFactory'
import SignupPage from '../pages/SignupPage'

describe('Signup', () => {

    // before(function(){
    //     cy.log('tudo aqui e execultado uma unica vez ANTES de TODOS os casos de testes');
    // })

    // beforeEach(function(){
    //     cy.log('Tudo aqui é executado sempre ANTES de CADA caso de teste')
    // })

    // after(function(){
    //     cy.log('tudo aqui e executado sempre DEPOIS de TODOS os casos de testes')
    // })

    // afterEach(function(){
    //     cy.log('Tudo Aqui é executado sempre DEPOIS de CADA caso de testet')
    // })

    // beforeEach(function () {
    //     cy.fixture('delivery').then((d) => {
    //         this.delivery = d
    //     })
    // })

    it('User shold be deliver', function () {

        var deliver = sigupFactory.deliver()

        signup.go()
        signup.fillForm(deliver)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)

    })

    it('Incorrect document', function () {

        var deliver = sigupFactory.deliver()

        deliver.cpf = '087158çlo88'

        const expectedMessage = 'Oops! CPF inválido'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe(expectedMessage)

    })

    it('Incorrect email', function () {

        var deliver = sigupFactory.deliver()

        deliver.email = 'teste.test.com'

        const expectedMessage = 'Oops! Email com formato inválido.'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe(expectedMessage)

    })

    context('Required fields', function (){
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function(){
            SignupPage.go()
            SignupPage.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                SignupPage.alertMessageShouldBe(msg.output)
            })
        })
    })
})