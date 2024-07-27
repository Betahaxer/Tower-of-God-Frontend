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
    cy.get('#overlay1').should('be.visible')
    cy.get('#overlay1').should('have.length.greaterThan', 0)

    cy.get('input[name="value2"]').type('Dell')
    cy.get('#overlay2').should('be.visible')
    cy.get('#overlay2').should('have.length.greaterThan', 0)
  })

  it('should be able to select a result from the overlay and compare', () => {
    cy.get('select.chakra-select').should('be.visible').select('laptop')
    // select a left product
    cy.get('input[name="value1"]').type('Dell')
    cy.get('#overlay1').should('be.visible')
    cy.get('#overlay1').should('have.length.greaterThan', 0)
    cy.get('#overlay1').first().click()
    cy.get('#product-left').should('be.visible')
    // select a right product
    cy.get('input[name="value2"]').type('Dell')
    cy.get('#overlay2').should('be.visible')
    cy.get('#overlay2').should('have.length.greaterThan', 0)
    cy.get('#overlay2').first().click()
    cy.get('#product-right').should('be.visible')
  })

  it('should allow users to click the selected product on the left side', () => {
    cy.get('select.chakra-select').should('be.visible').select('laptop')
    // select a left product
    cy.get('input[name="value1"]').type('Dell')
    cy.get('#overlay1').should('be.visible')
    cy.get('#overlay1').should('have.length.greaterThan', 0)
    cy.get('#overlay1').first().click()
    cy.get('#product-left').click()
    cy.url().should('contain', '/products')
  })
})
