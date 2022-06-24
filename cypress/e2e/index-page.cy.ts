const menuSocialLinks = ['linkedin', 'telegram', 'github', 'email'];
const footerSocialLinks = [
  'linkedinlinkedin',
  'telegramtelegram',
  'githubgithub',
  'emailemail',
];

describe('Index page', () => {
  it('Loader hides', () => {
    cy.visit('http://localhost:3000');

    cy.get('.loader').should('not.be.visible');
  });

  it('Page title is visible', () => {
    cy.get('.header__container__title__line__content').should('be.visible');
  });

  it('Projects count is greater then zero', () => {
    cy.get('.project').should('have.length.at.least', 0);
  });

  it('Social links in menu is correct', () => {
    const links = cy.get('.menu__back-item__content__links__item');

    links.each((link, i) => {
      cy.wrap(link).should('have.text', menuSocialLinks[i]);
    });
  });

  it('Social links in footer is correct', () => {
    const links = cy.get('.footer__content__social-links__link');

    links.each((link, i) => {
      cy.wrap(link).should('have.text', footerSocialLinks[i]);
    });
  });

  it('Scrolling down to projects', () => {
    cy.get('.nav__list__item').contains('Projects').click({ timeout: 8000 });

    cy.get('.project').should('be.visible');
  });

  it('Scrolling down to about me', () => {
    cy.get('.nav__list__item').contains('About').click({ timeout: 8000 });

    const aboutMe = cy.get('.about-me__content');

    aboutMe.should('be.visible');

    aboutMe.each((el) => {
      cy.wrap(el.text()).should('have.length.above', 0);
    });
  });
});
