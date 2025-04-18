let commonData, loginData, productPositions, cartData;

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
      cy.fixture('cartData').then((data) => {
        cartData = data;
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
      cy.selectCategory(commonData.categories.laptops);
      cy.selectProduct(productPositions.validPosition.productPosition);
  });
});
  
  it('add the correct product into cart and verify',{ tags: ['@regression-P0'] },() => {
     cy.addToCart();
     cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('Product added.');
    });
     cy.selectNavigationBar(commonData.navigationItems.cart).click();
    cy.getCartTableHeader(cartData.validHeader.tableHeader);
  cy.get('@productName').then((productName) => {
    const expectedProducts = [productName.trim()];
    cy.verifyProductsInCart(expectedProducts);
    cy.get('@productName').then((actualProductInTheCart) => {
      expect(actualProductInTheCart).to.eq(expectedProducts[0]);
    });
  });
    });

    
  });