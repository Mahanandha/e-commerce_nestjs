describe("ProductList component", () => {
  beforeEach(() => {
    cy.visit("/products");
  });

  it("should render the product list", () => {
    cy.get(".MuiCard-root").should("be.visible");
  });

  it("should display products", () => {
    cy.get(".MuiCard-root").should("have.length.at.least", 1);
 });
it("should filter products by name", () => {
  cy.get('input').eq(0).type("Nail Cutter");
  cy.get(".MuiCard-root")
    .eq(0)
    .find(".MuiTypography-h6")
    .should("contain", "Nail Cutter");
});

it("should filter products by price", () => {
  cy.get('input').eq(1).type("50");
  cy.get(".MuiCard-root")
    .eq(0)
    .find(".MuiTypography-body2")
    .contains("Price:")
    .should("contain", "50");
});
  it("should navigate to create product page", () => {
    cy.get("button").contains("+ Create Product").click();
    cy.url().should("include", "/products/create");
  });

  it("should navigate to edit product page", () => {
    cy.get(".MuiCard-root").eq(0).find("button").contains("Edit").click();
    cy.url().should("include", "/products/edit/");
  });

  it("should delete product", () => {
    cy.intercept("DELETE", "/products/*", { statusCode: 200 }).as(
      "deleteProduct",
    );
    cy.get(".MuiCard-root").eq(0).find("button").contains("Delete").click();
    cy.on("window:confirm", (str) => {
      expect(str).to.equal("Are you sure you want to delete this product?");
      return true;
    });
    cy.wait("@deleteProduct").then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);
    });
  });
});
