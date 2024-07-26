import { checkProductCategory } from "../../utils/checkProductCategory";

describe("Search Bar tests", ()=>{
    beforeEach(()=>{
        cy.visit("/");
    })
    it("should be able to give recommended products upon click on search icon", ()=>{
        cy.get('input[placeholder="Search..."]').type("mouse");
        cy.get('.chakra-input__right-element > .chakra-button').click();
        // at least one product card is shown
        cy.get('.chakra-card__body').should('have.length.greaterThan', 0);
    })

    it("should be able to give recommended products upon user pressing enter", ()=>{
        // intercepts the request whenever it is sent and alias it
        cy.intercept('GET', '/api/products/*').as('getProducts');

        cy.get('input[placeholder="Search..."]').type("mouse").type('{enter}');

        // Wait for the request to be intercepted and get the response
        cy.wait('@getProducts').then((interception) => {
            // Assert the status code of the response
            expect(interception.response.statusCode).to.eq(200);
            
            // Assert the response body
            expect(interception.response.body).to.have.property('results');
            expect(interception.response.body.results.products).to.have.length.greaterThan(0);

            checkProductCategory(interception.response.body.results.products[0], 'mouse');
        });
        
        // at least one product card is shown
        cy.get('.chakra-card__body').should('have.length.greaterThan', 0);
    })

    it("should be able to give recommended products with typos in input", ()=>{
        // intercepts the request whenever it is sent and alias it
        cy.intercept('GET', '/api/products/*').as('getProducts');

        cy.get('input[placeholder="Search..."]').type("mosue").type('{enter}');

        // Wait for the request to be intercepted and get the response
        cy.wait('@getProducts').then((interception) => {
            // Assert the status code of the response
            expect(interception.response.statusCode).to.eq(200);
            
            // Assert the response body
            expect(interception.response.body).to.have.property('results');
            expect(interception.response.body.results.products).to.have.length.greaterThan(0);
        
            checkProductCategory(interception.response.body.results.products[0], 'mouse');
        });
        
        // at least one product card is shown
        cy.get('.chakra-card__body').should('have.length.greaterThan', 0);
    })

    it("should be able to give recommended products with no inputs", ()=>{
        // intercepts the request whenever it is sent and alias it
        cy.intercept('GET', '/api/products/*').as('getProducts');

        cy.get('input[placeholder="Search..."]').type('{enter}');

        // Wait for the request to be intercepted and get the response
        cy.wait('@getProducts').then((interception) => {
            // Assert the status code of the response
            expect(interception.response.statusCode).to.eq(200);
            
            // Assert the response body
            expect(interception.response.body).to.have.property('results');
            expect(interception.response.body.results.products).to.have.length.greaterThan(0);
        });
        
        // at least one product card is shown
        cy.get('.chakra-card__body').should('have.length.greaterThan', 0);
    })

    it("should be able to give recommended products with random inputs", ()=>{
        // intercepts the request whenever it is sent and alias it
        cy.intercept('GET', '/api/products/*').as('getProducts');

        cy.get('input[placeholder="Search..."]').type("afmfwn23rnn").type('{enter}');

        // Wait for the request to be intercepted and get the response
        cy.wait('@getProducts').then((interception) => {
            // Assert the status code of the response
            expect(interception.response.statusCode).to.eq(200);
            
            // Assert the response body
            expect(interception.response.body).to.have.property('results');
            expect(interception.response.body.results.products).to.have.length.greaterThan(0);
        });
        
        // at least one product card is shown
        cy.get('.chakra-card__body').should('have.length.greaterThan', 0);
    })
})