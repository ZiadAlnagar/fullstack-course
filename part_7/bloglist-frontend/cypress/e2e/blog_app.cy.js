/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Blog app', function () {
  beforeEach(function () {
    cy.destroy();
    cy.signup({ name: 'john doe', username: 'johndoe', password: 'password' });
    cy.signup({ name: 'super user', username: 'root', password: 'password' });
    cy.home();
  });

  it('Login form is shown', function () {
    cy.contains('log in to application');
    cy.get('#login-form');
    cy.get('#login-btn');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('johndoe');
      cy.get('#password').type('password');
      cy.get('#login-btn').click();

      cy.contains('john doe logged in');
      cy.get('#login-form').should('not.exist');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('johndoe');
      cy.get('#password').type('wrong');
      cy.get('#login-btn').click();

      cy.get('.error')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .contains('invalid username or password');

      cy.get('#login-form');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'johndoe', password: 'password' });
    });

    it('A blog can be created', function () {
      cy.contains('button', 'create new blog').click();

      cy.get('#title').type('awesome blog title');
      cy.get('#author').type('awesome blog author');
      cy.get('#url').type('awesome blog url');
      cy.get('#blog-form button').click();

      cy.contains('awesome blog title awesome blog author');
    });

    describe('and some blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'john', url: 'foo' });
        cy.createBlog({
          title: 'second blog',
          author: 'doe',
          url: 'bar',
          likes: 5,
        });
        cy.createBlog({
          title: 'third blog',
          author: 'batman',
          url: 'bat cave',
          likes: 8,
        });
        cy.home();
        cy.wait(1000);
      });

      it('one of those can be liked', function () {
        cy.contains('first blog').as('trigger');
        cy.get('@trigger').parent().find('.extendable').as('content');

        cy.get('@trigger').contains('view').click();

        cy.get('@content').contains('likes 0');
        cy.get('@content').contains('like').click();
        cy.get('@content').contains('likes 1');
      });

      describe('delete', function () {
        it('succeeds if authorized user', function () {
          cy.contains('second blog').as('trigger');

          cy.get('@trigger').parent().find('.extendable').as('content');

          cy.get('@trigger').contains('view').click();

          cy.get('@content').contains('remove').click();
          cy.should('not.contain', 'second blog');
        });

        it('fails with other users', function () {
          cy.logout();
          cy.login({ username: 'root', password: 'password' });

          cy.contains('second blog').as('trigger');
          cy.get('@trigger').parent().find('.extendable').as('content');

          cy.get('@trigger').contains('view').click();

          cy.get('@content').contains('delete').should('not.exist');
        });
      });

      it('those blogs are (re)ordered desc by likes', function () {
        cy.get('.blog').eq(0).as('first');
        cy.get('.blog').eq(1).as('second');
        cy.get('.blog').eq(2).as('third');

        cy.get('@first').contains('likes 8');
        cy.get('@second').contains('likes 5');
        cy.get('@third').contains('likes 0');

        cy.get('@second').contains('view').click();

        cy.contains('likes 5').find('button').as('like');
        for (let i = 0; i < 5; i += 1) cy.get('@like').click();
        cy.wait(1000);

        cy.get('@first').contains('likes 10');
        cy.get('@second').contains('likes 8');
        cy.get('@third').contains('likes 0');
      });
    });
  });
});
