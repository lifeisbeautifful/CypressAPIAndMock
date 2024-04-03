describe("UI tests", () => {
    beforeEach("Login", () => {
        cy.login("test12346@gmail.com", "testUser")
    })
    it.only("Create article", () => {
        cy.visit("/")
        cy.contains("New Article").click()
        cy.get("[placeholder='Article Title']").type("testingTitle")
        cy.get("[formcontrolname='description']").type("test")
        cy.get("[placeholder='Write your article (in markdown)']").type("tell")
        cy.contains("Publish Article").click()
    })

    it("Delete article", () => {
        cy.visit("https://conduit.bondaracademy.com/profile/testUser1")
    })
})