describe('Product Details Page test', () => {
  const setupProductDetailsPage = () => {
    cy.visit('/')
    cy.get('input[placeholder="Search..."]').type('mouse')
    cy.get('.chakra-input__right-element > .chakra-button').click()
    cy.get('div.chakra-card').first().find('div.chakra-card__body').click()
  }

  beforeEach(() => {
    setupProductDetailsPage()
  })

  it('should be able to display product image', () => {
    cy.get('img').should('be.visible')
    cy.get('img').should('have.attr', 'src').and('not.be.empty')
  })

  it('should be able to display product summary', () => {
    cy.get('p.chakra-text').should('be.visible')
    cy.get('p.chakra-text').should('not.be.empty')
  })

  it('should be able to display at least 1 item each in pros and cons', () => {
    cy.get('#pros-and-cons').should('exist')
    cy.get('#pros-and-cons').children().should('have.length', 2)
    cy.get('#pros-and-cons')
      .children()
      .each(($child) => {
        // check if each list group is not empty and has text
        cy.wrap($child)
          .children()
          .should('have.length.greaterThan', 0)
          .invoke('text')
          .should('not.be.empty')
      })
  })

  it('should have a specifications section with at least 1 list item', () => {
    cy.contains('p.chakra-text', 'Specifications', { matchCase: false })
      .next('ul')
      .as('specs')
    cy.get('@specs').should('exist').and('be.visible')
    cy.get('@specs').should('have.length.greaterThan', 0)
  })

  it('should have a compare button which leads to compare page with the current product', () => {
    cy.contains('button.chakra-button', 'Compare', { matchCase: false }).as(
      'compare',
    )
    cy.get('@compare').click()
    cy.url().should('include', '/compare')
    cy.get('div.chakra-card').first().should('not.contain', 'Product 1')
    // to also check if the left product shown is correct
  })

  it('should have a add to wishlist button which brings user to login page if not logged in', () => {
    cy.contains('button.chakra-button', 'Add to Wishlist', {
      matchCase: false,
    }).as('wishlist')
    cy.get('@wishlist').should('exist')
    cy.get('@wishlist').click()
    cy.contains('.chakra-toast', 'Log in to add to wishlist', {
      matchCase: false,
    })
    cy.url().should('include', '/login')
  })

  it('should have a add to wishlist button which adds product to wishlist if logged in', () => {
    cy.login()
    cy.clearWishlist()
    setupProductDetailsPage()
    cy.contains('button.chakra-button', 'Add to Wishlist', {
      matchCase: false,
    }).as('wishlist')
    cy.get('@wishlist').should('exist')

    cy.get('@wishlist').click()
    cy.contains('.chakra-toast', 'Added to Wishlist', {
      matchCase: false,
    })
  })

  it('should have a add to wishlist button which doesnt allow duplicate wishlist items', () => {
    cy.login()
    cy.clearWishlist()
    setupProductDetailsPage()
    cy.contains('button.chakra-button', 'Add to Wishlist', {
      matchCase: false,
    }).as('wishlist')
    cy.get('@wishlist').should('exist')

    cy.get('@wishlist').click()
    cy.contains('.chakra-toast', 'Added to Wishlist', {
      matchCase: false,
    })
    cy.get('@wishlist').click()
    cy.contains('.chakra-toast', 'Item is already in wishlist', {
      matchCase: false,
    })
  })
})
