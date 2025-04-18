let commonData;
let loginData;
let productPositions;

describe('Navigation and Category Tests', () => {
    beforeEach(() => {
      cy.fixture('commonData').then((data) => {
        commonData = data;
      });
      cy.fixture('loginData').then((data) => {
        loginData = data;
      });
      cy.fixture('productData').then((data) => {
        productPositions = data;
      });
      cy.then(() => {
      cy.visit('/');
      cy.verifyURL();
      cy.selectNavigationBar(commonData.navigationItems.login).click();
      cy.login(loginData.validUser);
      cy.selectNavigationBar(commonData.navigationItems.cart).click();
      cy.getCartTableHeader("x");
      cy.clearCart();
      cy.selectNavigationBar(commonData.navigationItems.home).click();
    });
  });
  
  it('select correct product by using the container position',{ tags: ['@regression-P0'] }, () => {
    cy.selectCategory(commonData.categories.laptops);
    cy.selectProduct(productPositions.validPosition.productPosition);
    cy.get('@productName').then((productName) => {
      cy.log("the product selected:"+ productName);
    });
    });
  });