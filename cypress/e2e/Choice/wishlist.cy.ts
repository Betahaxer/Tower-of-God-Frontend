describe('Wishlist Page Tests (not logged in)', () => {
  beforeEach(() => {
    cy.visit('/wishlist')
  })

  it('should redirect to login page if user is not logged in', () => {
    cy.contains('.chakra-toast', 'Log in required')
    cy.url().should('include', '/login')
  })
})

describe('Wishlist Page Tests (logged in)', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/wishlist')
  })

  it('should display the wishlist page if user is logged in', () => {
    cy.url().should('include', '/wishlist')
  })

  it('should be able to search wishlist items', () => {
    cy.get('input[placeholder="Search Wishlist"]').type('Razer')
    cy.get('h2.chakra-heading').first().should('contain.text', 'Razer')
  })

  it('should navigate to product details page when a wishlist item is clicked', () => {
    cy.get('div.chakra-card__body').first().click({ force: true })
    cy.url().should('include', '/products')
  })

  it('should be able to select an item', () => {
    cy.get('button[aria-label="select"]').first().click()
    cy.get('button[aria-label="check"]')
      .first()
      .should('exist')
      .and('have.class', 'CheckButton')
  })

  it('should be able to select all items', () => {
    cy.get('button[aria-label="select"]').first().click()
    cy.get('button[aria-label="check"]')
      .first()
      .should('exist')
      .and('have.class', 'CheckButton')

    cy.contains('button', 'Select All').click()
    cy.get('div.chakra-card').then(($cards) => {
      const cardCount = $cards.length

      cy.get('button[aria-label="check"]').then(($buttons) => {
        const buttonCount = $buttons.length

        expect(cardCount).to.equal(buttonCount)
      })
    })
  })

  it('should be able to clear selected items', () => {
    cy.get('button[aria-label="select"]').first().click()
    cy.get('button[aria-label="check"]')
      .first()
      .should('exist')
      .and('have.class', 'CheckButton')

    cy.contains('button', 'Select All').click()
    cy.get('div.chakra-card').then(($cards) => {
      const cardCount = $cards.length

      cy.get('button[aria-label="check"]').then(($buttons) => {
        const buttonCount = $buttons.length

        expect(cardCount).to.equal(buttonCount)
      })
    })

    cy.contains('button', 'Clear').click()
    cy.get('button[aria-label="check"]').should('not.exist')
  })
})

describe('Deleting wishlist items', () => {
  beforeEach(() => {
    cy.login()
    cy.addOneItemToWishlist()
    cy.visit('/wishlist')
  })
  it('should be able to delete selected wishlist items', () => {
    // ensure wishlist has items to delete
    cy.get('button[aria-label="select"]').first().click()
    cy.contains('button', 'Select All').click()
    cy.contains('button', 'Delete').click()
    cy.get('footer').find('button').contains('Delete').click()
    cy.get('.chakra-toast').should('contain.text', 'Items deleted')
  })
})
