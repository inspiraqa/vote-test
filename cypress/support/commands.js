// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
require('cypress-xpath');

Cypress.Commands.add('signHellosignContract', () => {
    cy.waitForHellosignContractIframe(contractFrames => {
  
      const getIframeDocument = () => {
        return cy
          .get('iframe[src^="https://app.hellosign.com/editor/embeddedSign"]')
          .its('0.contentDocument').should('exist')
      }
  
      const getIframeBody = () => {
        return getIframeDocument()
          .its('body').should('not.be.undefined')
          .then(cy.wrap)
      }
  
      cy.wait(20000)
  
      getIframeBody().then($body => {
        if ($body.find("div[class='m-signature-request-preview--test-warning--content']").length > 0) {
          cy.log('There is a modal to confirm')
          getIframeBody().find("div[class=m-signature-request-preview--test-warning--content] button")
            .click()
        } else {
          cy.log('There is no modal to confirm')
        }
      })
  
      getIframeBody().find('[data-qa-ref="signature-input"]', { timeout: 30000 }).click();
  
      getIframeBody().find('#signature-modal-draw__canvas')
        .click(20, 10)
        .click(40, 10)
        .click(10, 30)
        .click(15, 34)
        .click(20, 37)
        .click(25, 39)
        .click(30, 40)
        .click(35, 39)
        .click(40, 37)
        .click(45, 34)
        .click(50, 30);
  
      getIframeBody().find("[data-qa-ref='singing-modal--insert-btn']", { timeout: 30000 }).click();
  
      getIframeBody()
        .find('[data-testid="notification-banner"]', { timeout: 30000 })
        .should('be.visible');
  
      getIframeBody()
        .find('[data-qa-ref="button-next"]', { timeout: 10000 })
        .click()
  
      getIframeBody()
        .find('[data-qa-ref="button-agree"]', { timeout: 10000 })
        .click()
  
      getIframeBody()
        .find('#signer-mobile-application div.m-signature-request-complete--header.whitelabel-secondary-header > button > span', { timeout: 10000 })
        .click()
  
    });
  });
  
  