describe('Project portfolio page', () => {
  it('Overlay shows correct route name', () => {
    cy.visit('http://localhost:3000/project/portfolio');

    cy.get('.page-overlay').should('be.visible').and('have.text', 'portfolio');
  });

  it('Overlay hides', () => {
    cy.get('.page-overlay').should('not.be.visible');
  });

  it('Title should be visible', () => {
    cy.get('.project-title').should('be.visible');
  });

  it('Title should have correct text', () => {
    cy.get('.project-title')
      .should('include.text', 'Portfolio')
      .and('include.text', 'Version')
      .and('include.text', '3');
  });

  it('Should have source link', () => {
    cy.get('.project-header__info__links__item--source .project-link').should(
      'be.visible'
    );

    cy.get('.project-header__info__links__item--source .project-link').should(
      'have.text',
      'source'
    );

    cy.get('.project-header__info__links__item--source .project-link')
      .should('have.attr', 'href')
      .and('include', 'logotip4ik/portfolio');
  });

  it('Next project link should have correct link', () => {
    cy.get('.project-next').should('have.text', ' LPNU StudRecruit');

    cy.get('.project-next')
      .should('have.attr', 'href')
      .and('include', 'studrecruit');
  });

  it('Banner should be visible', () => {
    cy.get('.project-banner').should('be.visible');
  });
});
