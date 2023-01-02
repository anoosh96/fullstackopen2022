describe('phonebook', ()=>{
  beforeEach(()=>{
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'tester',
      email: 'tester@test.com',
      password: 'salainen'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('when user is not logged in', function() {
    it('display homepage', function (){
      cy.contains('Phonebook')
      cy.contains('Login')
    })

    it('allows user to login', function (){
      cy.get('#login-email').clear().type('tester@test.com')
      cy.get('#login-password').clear().type('salainen')
      cy.get('#login-button').click()
      cy.contains(`Logged in: tester@test.com`)
    })
  })

  describe('when user is logged in', function(){
    beforeEach(()=>{
      cy.login({email: 'tester@test.com', password: 'salainen'})
    })

    it('allows user to create a record', function(){
      cy.get('#phone-name').clear().type('Jon Doe Jr')
      cy.get('#phone-number').clear().type('23432223')
      cy.get('#add-button').click()
      cy.get('ul li').should('have.length', 1)
    })

    describe('when records already present', function(){
      beforeEach(()=>{
        cy.createRecord({name: 'Jon Doe Jr', number: '3324234234'})
        cy.createRecord({name: 'Damn Daniel', number: '1124234234'})
      })

      it('allows user to delete a record', function(){
        cy.get('ul li').should('have.length', 2)
        cy.on('window:confirm', () => true);
        cy.get('#delete-btn').click()
        cy.get('ul li').should('have.length', 1)
      })

      it('allows user to search records', function(){
        cy.get('ul li').should('have.length', 2)
        cy.get('#search-field').type('Daniel')
        cy.get('ul li').should('have.length', 1)
      })
    })
  })
})
