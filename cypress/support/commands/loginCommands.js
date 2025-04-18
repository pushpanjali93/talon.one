import { loginLocators } from '../locators/loginPage';

// Login into the application using user data.
Cypress.Commands.add('login',(loginData)=>{
    cy.log(`the login data is used here: ${loginData.username} and ${loginData.password}`);
    cy.wait(1000);
    cy.get(loginLocators.loginModal).should('be.visible');
    cy.get(loginLocators.username).clear().type(loginData.username,{ delay: 30 });
    cy.get(loginLocators.password).clear().type(loginData.password,{ delay: 30 });
    cy.get(loginLocators.submit).click();
})