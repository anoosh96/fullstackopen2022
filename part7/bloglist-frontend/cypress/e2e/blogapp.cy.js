describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      email: 'tester123@test.com',
      password: '123123',
      passwordConfirmation: '123123',
      name: 'tester'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('login', function(){
    it('succeeds when credentials are correct', function(){
      cy.get('#email').type('tester123@test.com')
      cy.get('#password').type('123123')
      cy.get('#login-btn').click()
      cy.contains('Logged in as: tester123@test.com')
    })

    it('fails when credentials are wrong', function(){
      cy.get('#email').type('tester123@test.com')
      cy.get('#password').type('33123')
      cy.get('#login-btn').click()
      cy.contains('invalid credentials')
    })
  })

  describe('when logged in', function(){
    beforeEach(function(){
      cy.login('tester123@test.com', '123123')
    })

    it('can create a blog', function(){
      cy.get('#toggle-btn').click()
      cy.get('#title').type('blog2')
      cy.get('#author').type('JK')
      cy.get('#url').type('dsfasf')
      cy.get('#add-btn').click()

      cy.get('.blog-list').contains('blog2')
    })

    describe('when blogs exist', function(){
      beforeEach(function(){
        cy.createBlog({ title: 'blog1', author: 'author1', url: 'url1', likes: 10 })
        cy.createBlog({ title: 'blog2', author: 'author2', url: 'url2', likes: 20 })
      })

      it('can like a blog', function(){
        cy.get('.blog-container').eq(0).find('#toggle-details').click()
        cy.get('.blog-container').eq(0).find('#like-btn').click()
        cy.get('.likes').contains('likes: 1')
      })

      it('can delete blog if user is the creator', function(){
        cy.wait(10)
        cy.get('.blog-container').eq(0).find('#toggle-details').click()
        cy.get('.blog-container').eq(0).find('#del-btn').click()

        cy.get('.blog-list').should('not.contain', 'author2')
        cy.get('.blog-list').should('contain', 'author1')
      })
    })
  })
})
