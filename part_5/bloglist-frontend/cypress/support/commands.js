Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body));
    cy.home();
  });
});

Cypress.Commands.add('logout', () => {
  localStorage.removeItem('loggedBlogAppUser');
  cy.home();
});

Cypress.Commands.add('signup', (user) => {
  cy.request('POST', 'http://localhost:3001/api/users/', user);
});

Cypress.Commands.add('createBlog', ({
  title, url, author, likes,
}) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: {
      title,
      url,
      author,
      likes,
    },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedBlogAppUser')).token
      }`,
    },
  });
});

Cypress.Commands.add('home', () => {
  cy.visit('http://localhost:3000');
});

Cypress.Commands.add('destroy', () => {
  cy.request('POST', 'http://localhost:3001/api/testing/reset');
});
