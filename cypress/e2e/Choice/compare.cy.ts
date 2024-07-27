describe('Comparison Page Tests', () => {
  beforeEach(() => {
    cy.visit('/compare')
  })

  it('should allow users to select a category from the dropdown', () => {
    cy.get('select.chakra-select').should('be.visible').select('laptop')
    cy.get('select.chakra-select').should('have.value', 'laptop')
  })

  it('should disable input boxes if category is not selected', () => {
    cy.get('input[name="value1"]').should('be.disabled')
    cy.get('input[name="value2"]').should('be.disabled')
  })

  it('should enable input boxes after selecting a category', () => {
    cy.get('select.chakra-select').should('be.visible').select('laptop')
    cy.get('input[name="value1"]').should('not.be.disabled')
    cy.get('input[name="value2"]').should('not.be.disabled')
  })

  it('should show overlay with possible results on typing', () => {
    cy.get('select.chakra-select').should('be.visible').select('laptop')
    cy.get('input[name="value1"]').type('Dell')
    cy.get('.result-overlay').should('be.visible')
    cy.get('.result-item').should('have.length.greaterThan', 0)
  })

  it('should select a result from the overlay and compare', () => {
    cy.get('#category-dropdown').select('Laptops')
    cy.get('#product-input-1').type('Dell')
    cy.get('.result-overlay').should('be.visible')

    // Assuming we select the first item from the overlay
    cy.get('.result-item').first().click()

    // Verify the selected product is added for comparison
    cy.get('.comparison-table').should('contain', 'Dell')
  })

  it('should enable both input boxes and allow selecting results for comparison', () => {
    cy.get('#category-dropdown').select('Laptops')
    cy.get('#product-input-1').should('not.be.disabled')
    cy.get('#product-input-2').should('not.be.disabled')

    cy.get('#product-input-1').type('Dell')
    cy.get('.result-overlay').should('be.visible')
    cy.get('.result-item').first().click()
    cy.get('.comparison-table').should('contain', 'Dell')

    cy.get('#product-input-2').type('HP')
    cy.get('.result-overlay').should('be.visible')
    cy.get('.result-item').first().click()
    cy.get('.comparison-table').should('contain', 'HP')
  })
})
