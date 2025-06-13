import "cypress-file-upload";
cy.intercept('GET', '/products/*').as('getProduct');
cy.visit('/products/1/edit');
cy.wait('@getProduct').then(() => {
  cy.get('h4').should('contain', 'Edit Product');
});