//Testing site : https://conduit.bondaracademy.com/
//test12346@gmail.com; testUser
//Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxODk4fSwiaWF0IjoxNzEyMDU3NTYwLCJleHAiOjE3MTcyNDE1NjB9.6mO1-z07BDqgrkecX60kwM-u1p5qhBASkdqtw2I_2nQ
import user from "../fixtures/user.json"
import article from "../fixtures/article.json"


describe('test API', () => {
  it('Get all users', () => {
    cy.request('GET', 'https://reqres.in/api/users?page=2').then(response => {
      console.log(response.body.data)
    })
  })

  it("Create article", () => {
    let token = ""
    
    cy.request('POST', 'https://conduit-api.bondaracademy.com/api/users/login', user).then(response => {
      const token = response.body.user.token;
      console.log(token)
      
      cy.request({
        url:"https://conduit-api.bondaracademy.com/api/articles/",
        headers:{
          'Authorization':"Token "+token,
          'Content-Type':'application/json'
        },
        body:article,
        method:"POST"
      }).then(response => {
        expect(response.status).to.equal(201)
      })
    })
  })

  //Test
    it("Mocking", () => {
      let tags = {
        "tags":[
        "my",
        "Test",
        "Cypress"
      ]
    }

      cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/tags', {"tags":[]})
      cy.visit("https://conduit.bondaracademy.com/login")
      cy.get("[placeholder='Email']").type("test12346@gmail.com")
      cy.get("[type='password']").type("testUser")
      cy.get("[type='submit']").click()
    })
})