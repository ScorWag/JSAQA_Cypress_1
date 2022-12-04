Cypress.Commands.add("login", (email, password) => {
  cy.contains("Log in").click();
  if (email) {
    cy.get("#mail").type(email);
  }
  if (password) {
    cy.get("#pass").type(password);
  }
  cy.contains("Submit").click();
});

Cypress.Commands.add("addBook", (testBook) => {
  cy.contains("Add new").click();
  cy.get("[placeholder='Enter book title']")
    .type(testBook.title)
    .should("have.value", testBook.title);
  cy.get("[placeholder='Enter book description']")
    .type(testBook.description)
    .should("have.value", testBook.description);
  cy.get("[placeholder='Enter book authors']")
    .type(testBook.authors)
    .should("have.value", testBook.authors);
  cy.contains("Submit").click();
  cy.contains(testBook.title).should("be.visible");
});

Cypress.Commands.add("findButtonBookBy", (bookTitle) => {
  return cy
    .contains(".card-body", bookTitle)
    .siblings(".card-footer")
    .children(".btn");
});
