describe("ProductForm component", () => {
  beforeEach(() => {
    cy.visit("/products/create");
  });

  it("should render the product form", () => {
    cy.get("h4").contains("Create Product");
    cy.get('input[name="name"]').should("be.visible");
    cy.get('input[name="description"]').should("be.visible");
    cy.get('input[name="price"]').should("be.visible");
    cy.get('input[name="stock"]').should("be.visible");
    cy.get("button").contains("Create").should("be.visible");
  });

  it('should allow user to input data', () => {
    cy.get('input[name="name"]').type('Product 1').should('have.value', 'Product 1');
    cy.get('input[name="description"]').type('This is a product').should('have.value', 'This is a product');
    cy.get('input[name="price"]').clear().type('10.99').should('have.value', '10.99');
    cy.get('input[name="stock"]').type('5').should('have.value', '5');
  });

  it('should create product successfully', () => {
    cy.intercept('POST', '/products', { statusCode: 201 }).as('createProduct');
    cy.get('input[name="name"]').type('Product 1');
    cy.get('input[name="description"]').type('This is a product');
    cy.get('input[name="price"]').clear().type('10.99');
    cy.get('input[name="stock"]').type('5');
    cy.get('input[type="file"]').invoke('attr', 'style', 'display: block;').attachFile('product-image.jpg');
    cy.get('button').contains('Create').click();
    cy.wait('@createProduct').then((interception) => {
      expect(interception.response?.statusCode).to.equal(201);
    });
    cy.url().should('include', '/products');
  });

  it('should display error message on product creation failure', () => {
    cy.intercept('POST', '/products', { statusCode: 400 }).as('createProduct');
    cy.get('input[name="name"]').type('Product 1');
    cy.get('input[name="description"]').type('This is a product');
    cy.get('input[name="price"]').clear().type('10.99');
    cy.get('input[name="stock"]').type('5');
    cy.get('input[type="file"]').invoke('attr', 'style', 'display: block;').attachFile('product-image.jpg');
    cy.get('button').contains('Create').click();
    cy.wait('@createProduct').then((interception) => {
      expect(interception.response?.statusCode).to.equal(400);
    });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('There was a problem. Please try again.');
    });
  });

  it('should render edit product form', () => {
    cy.visit('/products/1/edit');
    cy.wait(1000); // wait for the page to load
    cy.get('h4').contains('Edit Product');
    cy.get('input[name="name"]').should('be.visible');
    cy.get('input[name="description"]').should('be.visible');
    cy.get('input[name="price"]').should('be.visible');
    cy.get('input[name="stock"]').should('be.visible');
    cy.get('button').contains('Update').should('be.visible');
  });

  it('should update product successfully', () => {
    cy.intercept('PUT', '/products/1', { statusCode: 200 }).as('updateProduct');
    cy.visit('/products/1/edit');
    cy.wait(1000); // wait for the page to load
    cy.get('input[name="name"]').clear().type('Updated Product');
    cy.get('button').contains('Update').click();
    cy.wait('@updateProduct').then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);
    });
    cy.url().should('include', '/products');
  });
});
