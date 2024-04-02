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
  
    it("Get empty preview message API", () => {
      const emptyArticles = {
        "articles":[]
      }
  
      cy.intercept("GET", "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0", emptyArticles)

      cy.request("GET", "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0").then(res => {
        console.log(res.body.articlesCount)
        //expect(res.body.articlesCount).to.equal(0)
      })
    })

    it("Delete article via API", () => {
        
      })
  
  })
  