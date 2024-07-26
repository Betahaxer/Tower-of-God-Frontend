describe('login tests', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('/')
      cy.contains('Sign Up').click();
      cy.url().should('include', '/register');
    })
  
    it('should allow a user to sign up for an account', () => {
      // generate username based on the current time which gurantees uniqueness
      const uniqueUsername = `${Date.now()}`;
  
      cy.get('input[placeholder="Enter your email"]').type(`${uniqueUsername}@gmail.com`);
      cy.get('input[placeholder="Create a password"]').type('123');
  
      cy.contains('button', 'Register').click();
      cy.contains('.chakra-toast', 'Account created.');
    });

    it('should not allow both empty fields', () => {  
        cy.contains('button', 'Register').click();
    
        cy.contains('.chakra-toast', 'Oops...');
      });
    
      it('should not allow empty emails', () => {  
        cy.get('input[placeholder="Create a password"]').type('123');
        cy.contains('button', 'Register').click();
    
        cy.contains('.chakra-toast', 'Oops...');
      });
    
      it('should not allow empty passwords', () => {  
        cy.get('input[placeholder="Enter your email"]').type('3@gmail.com');
        cy.contains('button', 'Register').click();
    
        cy.contains('.chakra-toast', 'Oops...');
      });
    
      it('should allow only emails', () => {  
        cy.get('input[placeholder="Enter your email"]').type('3anyhowtest');
        cy.get('input[placeholder="Create a password"]').type('123');
        cy.contains('button', 'Register').click();
    
        cy.contains('.chakra-toast', 'Oops...');
      });

      it('should have a link to login page', () => {  
        cy.get('a[href="/login"]').click();
    
        cy.url().should("include", "/login");
      });
})