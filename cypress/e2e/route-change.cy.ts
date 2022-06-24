describe('Changing routes', () => {
  beforeEach(() => cy.visit('http://localhost:3000'));

  it('Going from index to projects and back to index', () => {
    cy.get('.loader').should('not.be.visible');

    cy.get('.project').then((elements) => {
      const count = elements.length;

      for (let i = 0; i < count; i++) {
        cy.get(`.project:nth-of-type(${i + 1})`).click();

        cy.get('.nav__back-link').should('be.visible');

        cy.url().should('include', '/projects/');

        cy.get('.nav__back-link').click();

        cy.get('.header__container__title__line__content').should('be.visible');

        cy.url().should('not.include', '/projects/');
      }
    });
  });

  it('Going from index to project and to next project until sees repeating one', () => {
    const visited = new Set();
    let visitedAll = false;

    cy.get('.loader').should('not.be.visible');

    cy.get('.project').first().click();

    cy.get('.nav__back-link').should('be.visible');
    cy.url().should('include', '/projects/');

    const titleText = cy.$$('.project-title').text();
    visited.add(titleText);

    while (visitedAll !== true) {
      const projectNext = cy.get('.project-next');

      projectNext.should('be.visible');
      projectNext.click();

      cy.get('.nav__back-link').should('be.visible');

      const titleText = cy.$$('.project-title').text();

      if (visited.has(titleText)) visitedAll = true;

      visited.add(titleText);
    }
  });
});
