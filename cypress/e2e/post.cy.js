describe('POST /characters', function () {

    it('deve cadastrar um personagem', function () {

        const character = { // uma constante é diferente de uma variavel pois ele é um objeto constante. imutavel
            name: 'Tony Stark', //name, alias, team, active... são chaves dentro da constanste character
            alias: 'Homem de ferro',
            team: ['Avengers'],
            active: true
        }

        cy.postCharacter(character)
            .then(function (response) {
                expect(response.status).to.eql(201)//201 é o alerta do insomnia para indicar que o cadastro foi feito com sucesso
                cy.log(response.body.character_id)
                expect(response.body.character_id.length).to.eql(24)
            })
    })

    context('quando o personagem já existe', function () {

        const character = {
            name: 'Peter Parker',
            alias: 'Homem Aranha',
            team: ['Avengers, Solo'],
            active: true
        }

        before(function () {
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(201)
            })
        })

        it('não deve cadastrar duplicado', function () {
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Duplicate character')
            })
        })
    });
}) 