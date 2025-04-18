let commonData;
let loginData;
let productPositions;
let placeOrderData;
let cartData;

describe('Navigation and Category Tests', () => {
  // can be used fixture load in the before() but i used here in beforeEach() because i want to dynamically load the fixture.

  // *** learn more about it.
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
      cy.fixture('placeOrderData').then((data) => {
        placeOrderData = data;
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
       cy.addToCart();
       cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Product added.');
      });
       cy.selectNavigationBar(commonData.navigationItems.cart).click();
      cy.getCartTableHeader(cartData.validHeader.tableHeader);
      cy.get('@productName').then((productName) => {
        const expectedProducts = [productName.trim()];
      cy.verifyProductsInCart(expectedProducts);
      cy.get('@actualProductInTheCart').then((actualProductInTheCart) => {
        expect(actualProductInTheCart).to.eq(expectedProducts[0]);
      });
    });
      });
  });

  
  it('place order',{ tags: ['@smoke', '@regression-P0'] }, () => {
    cy.placeOrder();
    cy.fillOrderDetails(placeOrderData.validOrder);
    cy.clickPurchase();
  });

});