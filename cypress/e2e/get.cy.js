describe('GET /characters', function () {
    const characters = [{
        name: 'Peter Parker',
        alias: 'Homem Aranha',
        team: ['Avengers, Solo'],
        active: true
    },
    {
        name: 'Tony Stark',
        alias: 'Homem de ferro',
        team: ['Avengers'],
        active: true
    },
    {
        name: 'Logan',
        alias: 'Wolverine',
        team: ['X-men'],
        active: true
    }
    ]
    before(function () {
        cy.populateCharacters(characters)
    })
    it('Deve retornar uma lista de personagens', function () {
        cy.getCharacters().then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body).to.be.a('array')//esse codigo verifica se o tipo retornado do body, na resposta, é um array, ou seja, uma lista
            expect(response.body.length).greaterThan(0) //quantidade de personagens cadastrados, o metodo greaterThan verifica se existe acima de 1 personagem cadastrado
        })
    })
    it('Deve buscar personagem por nome', function () {
        cy.searchCharacters('Logan').then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body.length).to.eql(1)
            expect(response.body[0].alias).to.eql('Wolverine')
        })
    })
})

describe('GET /characters/id', function () {
    const natasha = {
        name: 'Nathasa',
        alias: 'Viuva Negra',
        team: ['Avengers'],
        active: true
    }
    context('Quando tem um personagem cadastrado', function () {
        before(function () {
            cy.postCharacter(natasha).then(function (response) {
                Cypress.env('characterId', response.body.character_id)
            })
        })
        it('Deve buscar o personagem pelo ID', function () {
            const id = Cypress.env('characterId')
            cy.getCharactersByID(id).then(function (response) {
                expect(response.status).to.eql(200)
                expect(response.body.team).to.eql(['Avengers'])
            })
        })
        it('Deve retornar 404 ao buscar por ID não cadastrado', function () {
            const id = '62ba5335014c3819e30f7960'
            cy.getCharactersByID(id).then(function (response) {
                expect(response.status).to.eql(404)
            })
        })
    })
})