describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'minhvdq',
      password: '1234',
      name: 'Damian Vu'
    })
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'jeong',
      password: '1234',
      name: 'JeongHo'
    })
    cy.visit('http://localhost:5173')
  })
  it('login form is shown', function() {
    cy.contains('log in').click()
    cy.get('html').should('contain', 'login')
  })
  describe('login', function() {
    it('successfully logged in', function() {
      cy.contains('log in').click()
      cy.get('#username').type('minhvdq')
      cy.get('#password').type('1234')
      cy.get('#login_button').click()

      cy.get('html').should('contain', 'minhvdq logged in')
    })
    it('fail to log in ', function() {
      cy.contains('log in').click()
      cy.get('#username').type('minhvdq')
      cy.get('#password').type('123456')
      cy.get('#login_button').click()

      cy.get('html').should('contain', 'Wrong username or password')
    })
  })
  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({username: 'minhvdq', password: '1234'})
      cy.visit('')
    })
    it(' a blog can be added', function() {

      cy.contains('add new blog').click()
      cy.get('#title').type('testing title')
      cy.get('#author').type('testing author')
      cy.get('#url').type('testing url')
      cy.contains('submit').click()

      cy.get('html').should('contain', 'testing title testing author')
    })
    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'testing title',
          author: 'testing author',
          url: 'testing url'
        })
        cy.createBlog({
          title: 'another test blog',
          author: 'testing author no2',
          url: 'testblog url'
        })
      })
      it('user can like blog', function() {
        cy.contains('testing title').contains('view').click()
        cy.contains('testing title').contains('like').click()
        cy.contains('testing title').should('contain', 1)
      })
      it('user can delete the blog', function() {
        cy.contains('testing title').contains('view').click()
        cy.contains('testing title').should('contain', 'remove')
      })
      it('other user cant delete', function() {
        cy.contains('log out').click()
        cy.login({username: 'jeong', password: '1234'})
        cy.contains('testing title').contains('view').click()
        cy.contains('testing title').contains('remove').should('not.be.visible')
      })
      it('blogs are sorted', function() {
        cy.contains('another test blog').contains('view').click()
        cy.contains('another test blog').contains('like').click()
        cy.get('.blog').eq(0).should('contain', 'another test blog')
        cy.get('.blog').eq(1).should('contain', 'testing title')
      })
    })
  })
})