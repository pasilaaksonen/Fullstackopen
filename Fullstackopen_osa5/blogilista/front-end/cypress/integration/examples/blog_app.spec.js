describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {      
            name: 'Testi Käyttäjä',      
            username: 'tkäyttäjä',      
            password: 'salainen'    
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.contains('login to application')
    })
  
    describe('Login',function() {
      it('succeeds with correct credentials', function() {
        cy.contains("log in").click()
        cy.get('#username').type('tkäyttäjä')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
        cy.contains("logout").click()
      })
  
      it('fails with wrong credentials', function() {
        cy.contains('log in').click()
        cy.get('#username').type('tkäyttäjä')
        cy.get('#password').type('väärä')
        cy.get('#login-button').click()

        cy.get('.error').should('contain', 'wrong username or password') 
        cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.contains("log in").click()
            cy.get('#username').type('tkäyttäjä')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
        })
    
        it('A blog can be created, liked and deleted', function() {
            cy.contains("create new blog").click()
            cy.get('#title').type('Testi blogi')
            cy.get('#author').type('Testiauthor')
            cy.get('#url').type('testiurl')
            cy.get('#blog-submit').click()

            cy.contains('Testi blogi Testiauthor')

            cy.contains("view").click()
            cy.contains("like").click()
            cy.wait(100)
            cy.contains('1')
            
            cy.contains("remove").click()
            cy.get('.message').should('contain', 'Succesfully deleted blog "Testi blogi"') 
        })
      })
  })