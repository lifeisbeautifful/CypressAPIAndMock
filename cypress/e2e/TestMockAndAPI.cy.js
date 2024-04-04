import user from "../fixtures/user.json"
import article from "../fixtures/article.json"



describe("Homework mock and API", () => {
    it("Get empty preview message UI", () => {
      const emptyArticles = {
        "articles":[]
      }
  
      cy.intercept("GET", "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0", emptyArticles)
      cy.visit("https://conduit.bondaracademy.com/login")
      cy.get("[placeholder='Email']").type("test12346@gmail.com")
      cy.get("[type='password']").type("testUser")
      cy.get("[type='submit']").click()
      cy.wait(1000)

      cy.get("[class='article-preview']").invoke("text").then(text => {
        expect(text).to.equal("No articles are here... yet.")
      })
    })
  
    it("Create article via API", () => {
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

    it("Delete article via API", () => {
        let token = ""

        cy.request('POST', 'https://conduit-api.bondaracademy.com/api/users/login', user).then(res => {
          token = res.body.user.token

          cy.request({
            url:'https://conduit-api.bondaracademy.com/api/articles/trylala1-1898',
            headers:{
              'Authorization':'Token ' + token
            },
            method:'DELETE'
          }).then(res => {
            expect(res.status).to.equal(204)
            expect(res.duration).to.not.be.greaterThan(1000)
            expect(res.body).to.equal('')
          })
        })
      })
  
  })
  