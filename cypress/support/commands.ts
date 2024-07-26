/// <reference types="cypress" />

import { checkProductCategory } from "../utils/checkProductCategory";

// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
// cypress/support/commands.js

Cypress.Commands.add('filterProductsByCategory', (category) => {
    // Click the filter button
    // if directly using .contains will scroll the menu and mess up the view
    // eventually not being able to find the button
    cy.get("button").find("span").contains("Filter By").click({ force: true });
    
    // Click the category button
    // Intercept the request and assert the response
    cy.intercept('GET', `/api/products/*category=${category}*`).as(`${category}`);
    cy.get(`button[type="button"][value="${category}"][role="menuitemradio"]`).click({ force: true });
    
    cy.wait(`@${category}`).then((interception) => {
      // Assert the status code of the response
      expect(interception.response.statusCode).to.eq(200);
      
      // Assert the response body
      expect(interception.response.body).to.have.property('results');
      expect(interception.response.body.results.products).to.have.length.greaterThan(0);
      cy.log(interception.response.body.results.products);
      checkProductCategory(interception.response.body.results.products[0], category);
    });
    
    // Assert that at least one product card is shown
    cy.get('.chakra-card__body').should('have.length.greaterThan', 0);
  });
  