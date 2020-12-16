/// <reference types="cypress" />
describe('Cy.intercept', () => {

  beforeEach(() => {
    cy.intercept('GET', '**/comments/*', (req) => {
      console.log('here is req', req);
    })
  });

  it('Should work', () => {
    cy.intercept('GET', '**/comments/*').as('getComment')

    cy.visit('https://example.cypress.io/commands/waiting');


    cy.get('.network-btn').click()

    cy.wait('@getComment').its('response.statusCode').should('be.oneOf', [200, 304])
    cy.wait('@getComment').its('response.body.postId').as('postId');
  });
})
