describe("Register component", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("should render the register form", () => {
    cy.get("h4").contains("Register");
    cy.get('input[name="name"]').should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get("button").contains("Register").should("be.visible");
  });

  it("should allow user to input data", () => {
    cy.get('input[name="name"]')
      .type("John Doe")
      .should("have.value", "John Doe");
    cy.get('input[name="email"]')
      .type("john@example.com")
      .should("have.value", "john@example.com");
    cy.get('input[name="password"]')
      .type("password123")
      .should("have.value", "password123");
  });

  it("should register user successfully", () => {
    cy.intercept("POST", "/auth/register", { statusCode: 201 }).as(
      "registerRequest",
    );
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("john@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get("button").contains("Register").click();
    cy.wait("@registerRequest").then((interception) => {
      expect(interception.response?.statusCode).to.equal(201);
    });
    cy.url().should("include", "/login");
  });

  it("should display error message on registration failure", () => {
    cy.intercept("POST", "/auth/register", { statusCode: 400 }).as(
      "registerRequest",
    );
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("john@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get("button").contains("Register").click();
    cy.wait("@registerRequest").then((interception) => {
      expect(interception.response?.statusCode).to.equal(400);
    });
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Registration failed.");
    });
  });
});
