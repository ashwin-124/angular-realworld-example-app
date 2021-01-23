// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/// <reference types="Cypress" />

Cypress.Commands.add("login", () => {
  //  Headless Authentication => Without Opening Login Scree, Cypress is doing login
  const userCredentials = {
    user: { email: "kurlyeashwin@gmail.com", password: "zaq1ZAQ!" },
  };
  cy.request({
    url: "https://conduit.productionready.io/api/users/login",
    method: "POST",
    body: userCredentials,
  }).then((response) => {
    const { status } = response;
    if (status === 200) {
      const {
        body: { user },
      } = response;

      const userToken = user.token;

      cy.visit("/", {
        onBeforeLoad(window) {
          window.localStorage.setItem("token", userToken);
        },
      });

      //  Creating Cypress Alias so that we can reuse it all across the test suit
      cy.wrap(userToken).as("accessToken");
    }
  });
});
