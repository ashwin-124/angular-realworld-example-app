describe("Test with Backend API", () => {
  beforeEach("opening headless authenticated website", () => {
    //  3. Test
    cy.server();
    //  type, apiPath, responseParameter
    cy.route("GET", "**/tags", "fixture:tags/get.json");

    cy.login();
  });

  it.only("1. Posting articles To the SERVER (NO REQUEST INTERCEPTION)", () => {
    cy.get("@accessToken").then((token) => {
      cy.log(`The access token is ${token}`);
      //  Creating New Article
      cy.fixture("articles/post").then((article) => {
        cy.request({
          url: "https://conduit.productionready.io/api/articles/",
          method: "POST",
          headers: {
            authorization: `Token ${token}`,
          },
          body: { ...article },
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.article.title).to.equal(article.article.title);
          expect(response.body.article.description).to.equal(
            article.article.description
          );
          expect(response.body.article.body).to.equal(article.article.body);
        });
      });

      //  Deleting The Article
    });
  });

  it("2. Intercepting Browser's Request, Modify them & Mock the Response of a Server", () => {
    cy.get("@accessToken").then((token) => {
      cy.log(`The access token is ${token}`);
    });
  });

  it.only("3. Intercepting & Mocking Server's Response From Local JSON File", () => {
    cy.get(".tag-list")
      .should("contain", "Test 1")
      .and("contain", "Test 2")
      .should("contain", "Test 3")
      .and("contain", "Test 4");
  });
});
