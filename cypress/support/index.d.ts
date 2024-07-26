declare namespace Cypress {
    interface Chainable {
        filterProductsByCategory(category: string): Chainable<any>;
    }
  }