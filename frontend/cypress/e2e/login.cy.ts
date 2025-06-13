/// <reference types="cypress" />

describe('Login component', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should render the login form', () => {
    cy.get('h4').contains('Login');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button').contains('Login').should('be.visible');
  });

  it('should allow user to input data', () => {
    cy.get('input[name="email"]').type('test@example.com').should('have.value', 'test@example.com');
    cy.get('input[name="password"]').type('password123').should('have.value', 'password123');
  });

  it('should login successfully', () => {
    cy.intercept('POST', '/auth/login', { statusCode: 200, body: { access_token: 'token' } }).as('loginRequest');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button').contains('Login').click();
    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);
    });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Login successful!');
    });
  });

  it('should display error message on login failure', () => {
    cy.intercept('POST', '/auth/login', { statusCode: 401 }).as('loginRequest');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button').contains('Login').click();
    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response?.statusCode).to.equal(401);
    });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Login failed.');
    });
  });
});