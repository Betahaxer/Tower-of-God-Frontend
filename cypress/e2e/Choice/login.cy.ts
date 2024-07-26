describe('login tests', () => {
  beforeEach(() => {
    // go to login page before every test
    // test account details
    // email: 3@gmail.com
    // password: 123
    cy.visit('/')
    cy.contains('Sign In').click();
    cy.url().should('include', '/login');
    
  })

  it('should allow a user to log in to their account', () => {  
    cy.get('input[placeholder="Enter your email"]').type('3@gmail.com');
    cy.get('input[placeholder="Create a password"]').type('123');
    cy.contains('button', 'Login').click();
    
    // only on successful login will the user be redirected to home
    cy.url().should('eq', 'http://localhost:5173/');
    cy.contains('.chakra-toast', 'You\'re logged in!');
  });

  it('should not allow both empty fields', () => {  
    cy.contains('button', 'Login').click();

    cy.contains('.chakra-toast', 'Oops...');
  });

  it('should not allow empty emails', () => {  
    cy.get('input[placeholder="Create a password"]').type('123');
    cy.contains('button', 'Login').click();

    cy.contains('.chakra-toast', 'Oops...');
  });

  it('should not allow empty passwords', () => {  
    cy.get('input[placeholder="Enter your email"]').type('3@gmail.com');
    cy.contains('button', 'Login').click();

    cy.contains('.chakra-toast', 'Oops...');
  });

  it('should allow only emails', () => {  
    cy.get('input[placeholder="Enter your email"]').type('3anyhowtest');
    cy.get('input[placeholder="Create a password"]').type('123');
    cy.contains('button', 'Login').click();

    cy.contains('.chakra-toast', 'Oops...');
  });

  it('should allow only registered accounts', () => {
    // unlikely that this account would be created
    cy.get('input[placeholder="Enter your email"]').type('29vh92vhj29qjcoqjc32@gmail.com');
    cy.get('input[placeholder="Create a password"]').type('192v41h90241h902vh');
    cy.contains('button', 'Login').click();

    cy.contains('.chakra-toast', 'Oops...');
  });

  it('should have a link to register page', () => {  
    cy.get('a[href="/register"]').click();

    cy.url().should("include", "/register");
  });
})