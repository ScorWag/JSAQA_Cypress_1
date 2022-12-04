class testBook {
  constructor(title, description, authors) {
    this.title = title;
    this.description = description;
    this.authors = authors;
  }
}

const testBook1 = new testBook(
  "Сказать жизни «Да!»: психолог в концлагере",
  "Эта удивительная книга сделала ее автора...",
  "Виктор Франкл"
);

const testBook2 = new testBook(
  "Тамплиеры. Рождение и гибель великого ордена",
  "Тамплиеры были одним из многих религиозных орденов...",
  "Дэн Джонс"
);

const testBook3 = new testBook(
  "Скрюченный домишко",
  "Помните английскую песенку в переводе Корнея Чуковского:...",
  "Агата Кристи"
);

beforeEach(() => {
  cy.visit("/");
});
it("Should open the main page", () => {
  cy.contains("Books list").should("exist");
  cy.contains("Log in").should("exist");
});

it("Should successfully login", () => {
  cy.login("test@test.com", "test");
});

it("Should not login with empty password", () => {
  cy.login("test@test.com");
  cy.get("#pass")
    .then(($el) => $el[0].checkValidity())
    .should("be.false");
});

describe("Test for favorites books", () => {
  before("Add books", () => {
    cy.visit("/");
    cy.login("test@test.com", "test");
    cy.addBook(testBook1);
    // cy.addBook(testBook2);
    // cy.addBook(testBook3);
    cy.contains("Log out").click();
  });
  it.only("Should add book to favorites", () => {
    cy.login("test@test.com", "test");
    cy.findButtonBookBy(testBook1.title).click();
    cy.contains("Favorites").click();
    cy.contains(testBook1.title).should("exist");
    cy.findButtonBookBy(testBook1.title).click();
  });

  it("Should delete book from favorites", () => {
    cy.login("test@test.com", "test");
    cy.findButtonBookBy(testBook1.title).click();
    cy.contains("Favorites").click();
    cy.findButtonBookBy(testBook1.title).click();
    cy.contains("Please add some book to favorit on home page!").should(
      "be.visible"
    );
  });

  it("Should open book info in favorites", () => {
    cy.login("test@test.com", "test");
    cy.findButtonBookBy(testBook1.title).click();
    cy.contains("Favorites").click();
    cy.contains("div", testBook1.title).click();
    cy.contains("Dowload book").should("exist");
  });
});
