describe('ProductForm component', () => {
  beforeEach(() => {
    cy.visit('/products/create');
  });

  it('should render the product form', () => {
    cy.get('h4').contains('Create Product');
    cy.get('input[name="name"]').should('be.visible');
    cy.get('input[name="description"]').should('be.visible');
    cy.get('input[name="price"]').should('be.visible');
    cy.get('input[name="stock"]').should('be.visible');
    cy.get('button').contains('Create').should('be.visible');
  });

it('should allow user to input data', () => {
  cy.get('input[name="name"]').type('Nail Cutter').should('have.value', 'Nail Cutter');
  cy.get('input[name="description"]').type('This is a product').should('have.value', 'This is a product');
  cy.get('input[name="price"]').clear().type('10.99').invoke('val').should('match', /^10\.99?0?$/);
  cy.get('input[name="stock"]').type('20').should('have.value', '020');
});
it('should create product successfully', () => {
  cy.intercept('POST', '/products/single', { statusCode: 201 }).as('createProduct');
  cy.get('input[name="name"]').type('Nail Cutter');
  cy.get('input[name="description"]').type('This is a product');
  cy.get('input[name="price"]').clear().type('10.99');
  cy.get('input[name="stock"]').type('20');
  cy.get('input[type="file"]').selectFile('cypress/fixtures/apples.jpg');
  cy.get('button').contains('Create').click();
  cy.wait('@createProduct', { timeout: 10000 }).then((interception) => {
    expect(interception.response?.statusCode).to.equal(201);
  });
  cy.url().should('include', '/products');
});
it('should display error message on product creation failure', () => {
  cy.intercept('POST', '/products/single', { statusCode: 400 }).as('createProduct');
  cy.get('input[name="name"]').type('Nail Cutter');
  cy.get('input[name="description"]').type('This is a product');
  cy.get('input[name="price"]').clear().type('10.99');
  cy.get('input[name="stock"]').type('20');
  cy.get('input[type="file"]').selectFile('cypress/fixtures/apples.jpg');
  cy.get('button').contains('Create').click();
  cy.wait('@createProduct', { timeout: 10000 }).then((interception) => {
    expect(interception.response?.statusCode).to.equal(400);
  });
  cy.on('window:alert', (str) => {
    expect(str).to.equal('There was a problem. Please try again.');
  });
});

  it('should render edit product form', () => {
    cy.visit('/products/edit/684a5d7c3545b1b5e1538a54');
    cy.wait(100); 
    cy.get('h4').contains('Edit Product');
    cy.get('input[name="name"]').should('be.visible');
    cy.get('input[name="description"]').should('be.visible');
    cy.get('input[name="price"]').should('be.visible');
    cy.get('input[name="stock"]').should('be.visible');
    cy.get('button').contains('Update').should('be.visible');
  });

  it('should update product successfully', () => {
    cy.intercept('PUT', '/products', { statusCode: 200 }).as('updateProduct');
    cy.visit('/products/edit/684a5d7c3545b1b5e1538a54');
    cy.wait(1000); 
    cy.get('input[name="name"]').clear().type('Updated Product');
    cy.get('button').contains('Update').click();
    // cy.wait('@updateProduct').then((interception) => {
    //   expect(interception.response?.statusCode).to.equal(200);
    // });
    cy.url().should('include', '/products');
  });
});