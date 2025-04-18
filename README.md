This project is done by Pushpanjali Dokania for Talon.one.

**Installation**
- npm install cypress --save-dev
- npm install -g npm


**Test Commands**
-  npm run test --> Open the test runner

-  npm run test:smoke:headed --> Run smoke tests in Chrome with UI

-  npm run test:smoke:headless --> Run smoke tests in Chrome without UI

-  npm run test:regression:headed --> Run regression tests (P0) headed

-  npm run test:regression:headless --> Run regression tests (P0) headless

-  npm run test:all:headed: run all the test cases in chrome and headed mode

-  npm run test:all:headless: run all the test cases in chrome and headless mode


**Environment specific commands**

- npm run test:all:env:headed --> run into headed production environment. one can change the script in package.json

- npm run test:all:env:headless -->run into headless production environment. one can change the script in package.json


**Project Structure**

- Follows Page Object Model (POM) for better organization and reusability

- Test cases are placed inside the cypress/e2e folder, grouped by features (e.g., login, cart, product and place order)

- Custom commands and locators are maintained under the support/ folder to promote DRY principles and improve readability

- Environment configurations and test behaviors (like video recording, timeouts, etc.) are handled in cypress.config.js


**Security Vulnerability**

If a valid username is entered with an incorrect password, the application displays a specific error message stating that the password is incorrect. This behavior unintentionally reveals that the username exists, which is a potential security vulnerability known as username enumeration.
To mitigate this, it's recommended to use a generic error message like "Invalid username or password" for all failed login attempts, regardless of whether the username or password is incorrect.


**Test Case Design**

- Test cases are designed to be independent and isolated—no dependency between tests.

- Only happy paths (positive scenarios) are implemented; however, the framework is extendable to cover negative and edge test cases.

- Test assertions and expectations are kept clear and focused.

- Test data is externalized in fixture files (cypress/fixtures/) to enable easy updates and reuse.


**Custom Commands**

- Custom commands are written for reusable flows (e.g., login, clear cart).

- Commands are parameterized and work dynamically for different test contexts.

Example: cy.clearCart() checks whether the cart is already empty and prevents unnecessary interaction.


**Test Stability & Debuggability**

- Screenshots and videos are enabled to assist in debugging failed test runs.

- Cypress automatically captures screenshots upon failure.

- Retries can be configured in cypress.config.js to re-attempt flaky tests.

- trashAssetsBeforeRuns: true clears all screenshots and videos before each test run, ensuring clean artifacts.

- Logging is added in commands and tests for better traceability during test execution.


**Tag-Based Test Execution**

- Tests are tagged using cypress-grep for easy filtering:

- @smoke – For basic functionality smoke checks (can be extended)

- @regression-P0 – For P0 regression suite

- These tags are used in scripts (package.json) to run specific test subsets.

- This is especially useful in CI/CD pipelines to trigger appropriate test suites.


**Environment Configuration**

- Test environment can be dynamically selected using the ENVIRONMENT variable.

Example: ENVIRONMENT=qa will run the test in QA-specific environment logic.

- The config.env.environment is available in tests and commands to write environment-specific logic.

- Sripts are defined in package.json to run in qa, production, or other target environments.

- baseUrl: https://www.demoblaze.com/ — Demo website used for testing


**Locator Strategy**

- Locators are stored centrally in support/locators/ for easy maintenance.

- Wherever possible, accessible and stable locators are used.

- If elements don’t have proper attributes (aria-label, data-test), hard waits are used temporarily.

- It's recommended to update the application with data-test attributes to improve test reliability.


**Known Limitations**

- Current tests use hard-coded waits in certain places due to lack of stable hooks in the DOM.

- Negative scenarios are not yet implemented but can be easily added.

- Test coverage currently focuses only on happy paths for key user journeys.

- Pagination is not handled in the tests.

- Checking the cart value and matching with place order is not handled.


**Recommendations for Future Enhancements**

- Add @P1, @P2 tags to categorize lower-priority test cases.

- Replace hard waits with cy.intercept() and wait on API responses or DOM events.

- Improve selectors using data-* attributes.

- Add cross-browser support and parallelization for faster execution.

- Extend test cases for full CRUD coverage and error handling.


**Test Cases**
In interest of time, only happy path P0 test cases have been covered. The framework however extends for other scenarios as well.
**Login:**
**P0 covered:**
- Login using valid credentials
- Login with invalid credentials (validation)

**P0,P1 to add**
- Empty username/password submission
- Logout functionality
- Password field masking

**Product**
**P0 covered**
- Add a product by article position

**P0,P1 to add**
- Navigate & Add multiple products
- Add product by name
- Verify product detail modal
- Test Pagination

**Cart**
**P0 covered:**
- Add product to cart and verify item in cart table

**P0,P1 to add**
- Remove product from cart
- Cart empty state validation
- Price validation for added products

**Place Order**
**P0 covered:**
- Complete flow from selecting a category → adding product → placing an order

**P0,P1 to add**:
- Place order with missing form fields
- Validate order success modal
- Add multiple products before placing order



**Disclosure on AI**
- I have used the AI for beautify the content of the ReadMe file.










