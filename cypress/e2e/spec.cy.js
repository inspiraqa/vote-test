Cypress._.times(80, () => {
  describe('Vote', () => {
    it('for Pronta Pra Desagradar', () => {

      Cypress.on('uncaught:exception', (err, runnable) => {
        return false
      })

      cy.clearAllSessionStorage()

      cy.visit('https://secawards.seriesemcena.com.br/clipe-do-ano/')
      cy.xpath("//span[text()='Pronta Pra Desagradar']//parent::label//parent::div//../input", { timeout: 8000 }).should('be.visible')

      cy.xpath("//span[text()='Pronta Pra Desagradar']//parent::label//parent::div//../input", { timeout: 8000 }).should('be.visible').click()
      cy.get("button[value='Votar']").scrollIntoView().click()

      cy.xpath('//span/p', { timeout: 8000 }).invoke('text').then(($value) => {
        const getText = $value
        cy.log(getText)

        const textOne = getText.replace('Por favor, digite a senha ', '');
        const finalText = textOne.replace(' para validar seu voto.', '')
        cy.log(finalText)

        cy.xpath("(//span[@class='pds-answer-other']/input)[2]").type(finalText)
        cy.get("button[value='Votar']").scrollIntoView().click()

        cy.xpath("//div[@class='pds-question-top'][contains(text(),'oto enviado')]", { timeout: 8000 }).should('be.visible')

      })
    })
  })
})