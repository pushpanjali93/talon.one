import { orderLocators } from '../locators/placeOrderPage';

// Click on the place order button.
Cypress.Commands.add('placeOrder', () => {
  cy.get(orderLocators.placeOrderButton,{ timeout: 10000 }).should('be.enabled').click();
});

//handles the fill form during placing order.
Cypress.Commands.add('fillOrderDetails', (orderData) => {
  cy.get(orderLocators.placeOrderContainer, { timeout: 10000 })
  .should('exist')
  .and('be.visible');
cy.get(orderLocators.nameInput, { timeout: 10000 })
  .should('be.visible')
  .should('not.be.disabled')
  .click()
  .clear()
  .type(orderData.name, { delay: 30 });
  cy.get(orderLocators.countryInput).clear().type(orderData.country,{ delay: 30 });
  cy.get(orderLocators.cityInput).clear().type(orderData.city,{ delay: 30 });
  cy.get(orderLocators.cardInput).clear().type(orderData.card,{ delay: 30 });
  cy.get(orderLocators.monthInput).clear().type(orderData.month,{ delay: 30 });
  cy.get(orderLocators.yearInput).scrollIntoView().clear().type(orderData.year,{ delay: 30 });
});

// clicks on the purchase button.
Cypress.Commands.add('clickPurchase', () => {
  cy.wait(1000);
cy.get(orderLocators.purchaseButton, { timeout: 10000 })
  .should('be.visible')
  .should('not.be.disabled')
  .click();
  cy.wait(1000);
  cy.get(orderLocators.successfulOrderPlace).should('have.attr','data-has-confirm-button','true').within(()=>{
    cy.get(orderLocators.okButton).should('be.visible').click();
  });
});