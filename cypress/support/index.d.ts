declare namespace Cypress {
  interface Chainable {
    filterProductsByCategory(category: string): Chainable<any>
    login(): Chainable<any>
    emptyWishlist(): Chainable<any>
    addOneItemToWishlist(): Chainable<any>
  }
}
