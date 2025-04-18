import { productLocators } from '../locators/productPage';

// Helps you to select the product using article positioning. (eg.; 1st product in laptops i.e., 0)
Cypress.Commands.add('selectProduct', (position) => {
  cy.wait(1000);
  cy.get(productLocators.productContainer,{timeout:10000}).within(() => {
    cy.get(productLocators.productTitle)
      .eq(position)
      .should('exist')
      .should('be.visible')
      .invoke('text')
      .then((title) => {
        cy.get(productLocators.productTitle).eq(position).scrollIntoView().click();
        cy.get(productLocators.productHeading)
        .should('exist')
        .should('be.visible')
          .invoke('text')
          .then((newPageTitle) => {
            cy.log(`the product in home page selected: ${title} and the product going to be added in the cart: ${newPageTitle}`)
            expect(newPageTitle.trim().toLowerCase()).to.eq(title.trim().toLowerCase());
            cy.wrap(newPageTitle.trim()).as('productName');
          });
      });
});
});