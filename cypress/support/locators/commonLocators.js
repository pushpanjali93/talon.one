export const commonLocators = {
cartLink: (navigateTo) => `#navbarExample li:contains('${navigateTo}')`,
productCategoryLink: (categoryName) => `.list-group a:contains('${categoryName}')`,
};