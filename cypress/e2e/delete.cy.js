describe('DELETE /characters/id', function () {
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
        it('Deve remover o personagem pelo ID', function () {
            const id = Cypress.env('characterId')
            cy.deleteCharactersByID(id).then(function (response) {
                expect(response.status).to.eql(204)
            })
        })
        after(function(){
            const id = Cypress.env('characterId')
            cy.getCharactersByID(id).then(function(response){
                expect(response.status).to.eql(404)
            })
        })
        it('Deve retornar 404 ao remover por ID não cadastrado', function () {
            const id = '62ba5335014c3819e30f7960'
            cy.deleteCharactersByID(id).then(function (response) {
                expect(response.status).to.eql(404)
            })
        })
    })
})