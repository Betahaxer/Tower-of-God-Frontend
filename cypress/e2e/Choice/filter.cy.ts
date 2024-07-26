import { checkProductCategory } from "../../utils/checkProductCategory";

describe("Search Bar tests", ()=>{
    beforeEach(()=>{
        cy.visit("/");
        cy.get('input[placeholder="Search..."]').type("mouse");
        cy.get('.chakra-input__right-element > .chakra-button').click();
    })

    it("should be able to filter products based on category", ()=>{
        cy.filterProductsByCategory("mouse");
    })

    it("should be able to filter products based on a single category only", ()=>{
        cy.filterProductsByCategory("mouse");
        cy.filterProductsByCategory("keyboard");
        cy.filterProductsByCategory("phone");
        cy.filterProductsByCategory("television");
        cy.filterProductsByCategory("speaker");
        cy.filterProductsByCategory("monitor");
        cy.filterProductsByCategory("laptop");
        cy.filterProductsByCategory("earbuds");
    })

})