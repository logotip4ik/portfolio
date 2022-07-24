describe('Project studrecruit page', () => {
  it('Overlay shows correct route name', () => {
    cy.visit('http://localhost:3000/project/studrecruit');

    cy.get('.page-overlay')
      .should('be.visible')
      .and('have.text', 'studrecruit');
  });

  it('Overlay hides', () => {
    cy.get('.page-overlay').should('not.be.visible');
  });

  it('Title should be visible', () => {
    cy.get('.project-title').should('be.visible');
  });

  it('Title should have correct text', () => {
    cy.get('.project-title')
      .should('include.text', 'LPNU')
      .and('include.text', 'Student')
      .and('include.text', 'Recruiting');
  });

  it('Should have live link', () => {
    cy.get('.project-header__info__links__item--live .project-link').should(
      'be.visible'
    );

    cy.get('.project-header__info__links__item--live .project-link').should(
      'have.text',
      'see live'
    );

    cy.get('.project-header__info__links__item--live .project-link')
      .should('have.attr', 'href')
      .and('include', 'studrecruit.lpnu.ua');
  });

  it('Should have 5 images', () => {
    cy.get('.project-main img').should('have.length', 6).and('be.visible');
  });

  it('Next project link should have correct link', () => {
    cy.get('.project-next').should('have.text', ' Portfolio');

    cy.get('.project-next')
      .should('have.attr', 'href')
      .and('include', 'portfolio');
  });
});
