export function checkProductCategory(product, category) {
    cy.log('Category of item:', product.category);
            
    expect(product.category).to.eq(category);
  }