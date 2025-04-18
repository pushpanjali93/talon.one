import { commonLocators } from '../locators/commonLocators';
import { loginLocators } from '../locators/loginPage';

// Verify if the URL is opened. Can be extended by checking the URL after login.
//But couldn't find additional data in the login to validate.
Cypress.Commands.add('verifyURL', () => {
  cy.url()
      .should('include', 'demoblaze');
});

// navigate to navigation bar(eg.; Home,Cart etc.)
Cypress.Commands.add('selectNavigationBar',(navigateTo)=>{
  cy.wait(1000);
  cy.log(`Selecting navigation bar: ${navigateTo}`);
  return cy.get(commonLocators.cartLink(navigateTo), { timeout: 10000 })
    .should('be.visible')
    .should('not.be.disabled');
});

// One can select the category from the home page. (eg.; Laptops,Mobile).
Cypress.Commands.add('selectCategory', (searchCategory) => {
  cy.wait(1500);
  cy.get(loginLocators.loginModal, { timeout: 10000 })
  .should('not.be.visible');
  cy.get(commonLocators.productCategoryLink(searchCategory), { timeout: 10000 })
  .should('exist')
    .should('be.visible')
    .click({ force: true });
  });