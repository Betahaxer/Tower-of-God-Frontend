describe('authentication', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('/')
  })

  it('should allow a user to sign up for an account', () => {
    const uniqueUsername = `${Date.now()}`;
    // Find the sign-up button and click it
    cy.contains('Sign Up').click();

    // Check if the user is led to the sign-up page
    cy.url().should('include', '/register');

    // Find the username field and enter a username
    cy.get('input[placeholder="Enter your email"]').type(`${uniqueUsername}@gmail.com`);

    // Find the password field and enter a password
    cy.get('input[placeholder="Create a password"]').type('123');

    // Click the sign-up button to register for an account
    cy.contains('button', 'Register').click();
    
    cy.contains('.chakra-toast', 'Account created.');
  });
  it('should allow a user to log in to their account', () => {
    
    // Find the sign-up button and click it
    cy.contains('Sign In').click();

    // Check if the user is led to the sign-up page
    cy.url().should('include', '/login');

    // Find the username field and enter a username
    cy.get('input[placeholder="Enter your email"]').type('3@gmail.com');

    // Find the password field and enter a password
    cy.get('input[placeholder="Create a password"]').type('123');

    // Click the sign-up button to register for an account
    cy.contains('button', 'Login').click();

    // Verify that the user is redirected to a welcome or dashboard page
    cy.url().should('eq', 'http://localhost:5173/');
    cy.contains('.chakra-toast', 'You\'re logged in!');
  });
})