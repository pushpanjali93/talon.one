import { cartLocators } from '../locators/cartPage';

//adds the product into cart
Cypress.Commands.add('addToCart',()=>{
  cy.wait(1500);
  cy.get(cartLocators.addToCartButton,{ timeout: 10000 }).should('exist').should('be.visible').click();
})

// returns the index of table header as per headerName eg.; title.
Cypress.Commands.add('getCartTableHeader', (headerName) => {  
  cy.wait(1000);
cy.get(cartLocators.cartTableContainer,{ timeout: 10000 }).should('be.visible');
cy.get(cartLocators.cartTableHeader)
 .invoke('text')
 .then((text) => {
   const cleanedText = text.trim().replace(/\s+/g, " ");
   const split = cleanedText.split(" ");
   const index = split.findIndex((word) => word.toLowerCase().trim() === headerName.toLowerCase().trim());
   cy.log(`The index of the  given header name Found ${index}` );
   expect(index).to.be.greaterThan(-1);
   cy.wrap(index).as("indexOfHeader");
 });
});

// validate the product in the cart using the index of table header(can also validate the total amount of the product).
Cypress.Commands.add('verifyProductsInCart', (expectedProducts) => {
  cy.wait(1000);
cy.get('@indexOfHeader').then((indexOfHeader) => {
 cy.get(cartLocators.cartRows,{ timeout: 10000 })
   .should('have.length', expectedProducts.length)
   .each(($row) => {
     cy.wrap($row)
       .find('td')
       .eq(indexOfHeader)
       .invoke('text')
       .then((actualProduct) => {
        cy.log(`The actual product in the cart added is: ${actualProduct}` );
         cy.wrap(actualProduct).as("actualProductInTheCart")
       });
   });
});
});

// Clears the cart using the index of header. Always set headerName=='x' to clear the cart.
Cypress.Commands.add('clearCart', () => {
  cy.get('@indexOfHeader').then((indexOfHeader) => {
    cy.get(cartLocators.cartTableContainer, { timeout: 10000 }).should('be.visible')
      .then(() => {
        //waiting for page to load. This page takes time to load the table page.
        // Behaviour: First it shows empty table and then loads.
        cy.wait(2000);
        cy.get(`${cartLocators.cartTableContainer} tbody`, { timeout: 10000 }).should('exist').then(($tbody) => {
          const hasRows = $tbody.find('tr').length > 0;
          if (!hasRows) {
            cy.log('There is no row to clear, Hence returning from here.');
            return;
          }
          // clearing all the added items in the cart.
          cy.get(cartLocators.cartRows).each(($row) => {
            cy.wrap($row)
              .find('td')
              .eq(indexOfHeader)
              .find('a')
              .click();
          });
        });
      });
  });
});


