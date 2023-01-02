Cypress.Commands.add('login', ({ email, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    email, password
  }).then(({ body }) => {
    localStorage.setItem('user', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createRecord', ({name, number}) => {
  cy.request({
    url: 'http://localhost:3001/api/records',
    method: 'POST',
    body: { name, number },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})