describe("talon.one Login", () => {
let commonData, loginData;
  beforeEach(() => {
    cy.visit("/");
    cy.verifyURL();
    cy.fixture('commonData').then((data) => {
      commonData = data;
    });
    cy.fixture('loginData').then((data) => {
      loginData = data;
    });
  });

  it('verify login using valid input data', { tags: ['@regression-P0'] },() => {
    cy.selectNavigationBar(commonData.navigationItems.login).click();
    cy.login(loginData.validUser);
    cy.selectNavigationBar(commonData.navigationItems.logout);
  });


  it('fails login with invalid credentials', { tags: ['@regression-P0'] }, () => {
    cy.selectNavigationBar(commonData.navigationItems.login).click();
    cy.login(loginData.invalidUser);
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('User does not exist.');
    });
  });


});


