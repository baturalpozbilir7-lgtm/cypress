describe("The Internet Testi", () => {
  beforeEach(() => {
    cy.visit("https://the-internet.herokuapp.com/");
  });

  it("Add/Remove", () => {
    cy.contains("Add/Remove Elements").click();

    cy.wait(500);

    cy.get(".example").within(() => {
      cy.get('button[onclick="addElement()"]').click();
      cy.get(".added-manually").should("be.visible");
      cy.wait(500);

      cy.get('button[onclick="addElement()"]').click();

      cy.wait(500);

      cy.get(".added-manually").first().click();
      cy.get(".added-manually").first().click();
      cy.get(".added-manually").should("not.exist");

      cy.wait(500);
    });

    cy.go("back");
  });

  it("Dropdown", () => {
    cy.contains("Dropdown").click();

    cy.wait(500);

    cy.get("#dropdown").select("Option 2").should("have.value", "2");

    cy.go("back");
  });

  it("Login Test", () => {
    cy.contains("Form Authentication").click();

    cy.get(".example").within(() => {
      cy.get("#username").type("tomsmith");
      cy.wait(500);
      cy.get("#password").type("SuperSecretPassword!");
      cy.wait(500);
      cy.get('button[type="submit"]').click();
      cy.wait(500);
    });

    cy.get("#flash").within(() => {
      cy.contains("You logged into a secure area!")
        .closest(".row")
        .should("exist");
    });

    cy.go("back");
  });

  it("Checkboxes", () => {
    cy.contains("Checkboxes").click();

    cy.get('input[type="checkbox"]').first().check().should("be.checked");
    cy.wait(500);
    cy.get('input[type="checkbox"]').eq(1).check().should("be.checked");

    cy.go("back");
  });

  it("keypresses", () => {
    cy.contains("Key Presses").click();
    cy.get("body").type("Selam");
    cy.wait(500);
    cy.get("#result").should("be.visible", "You entered: M");
    cy.get("body").type("{enter}");
    cy.wait(500);
    cy.get("#result").should("have.text", "You entered: ENTER");
  });

  it("hovers", () => {
    cy.contains("Hovers").click();
    cy.get("#content").within(() => {
      cy.get(".figure").eq(0).realHover();
      cy.wait(2000);
      cy.get(".figure").eq(1).realHover();
      cy.wait(2000);
      cy.get(".figure").eq(2).realHover();
      cy.wait(2000);
    });
  });
});
