/// <reference types="cypress" />

import { head } from 'cypress/types/lodash'
import { checkProductCategory } from '../utils/checkProductCategory'

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
  cy.get('button').find('span').contains('Filter By').click({ force: true })

  // Click the category button
  // Intercept the request and assert the response
  cy.intercept('GET', `/api/products/*category=${category}*`).as(`${category}`)
  cy.get(
    `button[type="button"][value="${category}"][role="menuitemradio"]`,
  ).click({ force: true })

  cy.wait(`@${category}`).then((interception) => {
    // Assert the status code of the response
    expect(interception.response.statusCode).to.eq(200)

    // Assert the response body
    expect(interception.response.body).to.have.property('results')
    expect(
      interception.response.body.results.products,
    ).to.have.length.greaterThan(0)
    cy.log(interception.response.body.results.products)
    checkProductCategory(
      interception.response.body.results.products[0],
      category,
    )
  })

  // Assert that at least one product card is shown
  cy.get('.chakra-card__body').should('have.length.greaterThan', 0)
})

Cypress.Commands.add('login', () => {
  cy.visit('/')
  cy.contains('Sign In').click()
  cy.url().should('include', '/login')
  cy.get('input[placeholder="Enter your email"]').type('3@gmail.com')
  cy.get('input[placeholder="Create a password"]').type('123')
  cy.contains('button', 'Login').click()

  // only on successful login will the user be redirected to home
  cy.url().should('eq', 'https://tower-of-god-frontend.vercel.app/')
  cy.contains('.chakra-toast', "You're logged in!")
})

Cypress.Commands.add('emptyWishlist', () => {
  // cy.login()
  // cy.request({
  //   method: 'GET',
  //   url: '/api/wishlist/',
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   qs: {
  //     offset: offset,
  //     page: page,
  //     page_size: pageSize,
  //   },
  // }).then((response) => {
  //   // Handle the response here
  //   expect(response.status).to.eq(200) // Assert that the response status is 200 (OK)
  //   // Add more assertions as needed
  // })
  // cy.get('a[href="/wishlist"').click()
  // cy.get('div.chakra-card').then(($cards) => {
  //   if ($cards.length > 0) {
  //     cy.get('div.chakra-card').first().find('button.chakra-button').click()
  //     cy.contains('button.chakra-button', 'Select All', { matchCase: false })
  //       .should('be.visible')
  //       .click()
  //     cy.contains('button.chakra-button', 'Delete', { matchCase: false })
  //       .should('be.visible')
  //       .click()
  //   } else {
  //     cy.log('No chakra cards found in the DOM')
  //   }
  // })
})

Cypress.Commands.add('addOneItemToWishlist', () => {
  // assume logged in
  cy.visit('/')
  cy.get('input[placeholder="Search..."]').type('mouse')
  cy.get('.chakra-input__right-element > .chakra-button').click()
  cy.get('div.chakra-card').first().find('div.chakra-card__body').click()
  cy.contains('button', 'Add to Wishlist').click()
})
