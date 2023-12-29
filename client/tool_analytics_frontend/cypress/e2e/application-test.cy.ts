describe('Application tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Test total page chart data registrations', () => {
    cy.visit('/#/total');
    cy.dataCy('landing-page-title').should('be.exist');
  });
  it('Test navigation', () => {
    cy.visit('/#/total');
    cy.dataCy('landing-page-title').should('be.exist');
    cy.visit('/#/perTool');
    cy.dataCy('tool-selector').should('exist');
    cy.visit('/#/compare');
    cy.dataCy('compare-selector').should('exist');
  });
  it('Test dropdown component', () => {
    cy.dataCy('test-info-card-1').should('not.be.exist');
    cy.dataCy('dropdown-test').should('be.visible').click().wait(250);
    cy.dataCy('test-info-card-1').should('be.exist');
  });
  it('Test chart change on total page', () => {
    cy.dataCy('chart-header')
      .should('exist')
      .invoke('text')
      .should('eq', 'Total tool usage by months');
    cy.dataCy('radio-2').should('exist').click().wait(250);
    cy.dataCy('chart-header')
      .should('exist')
      .invoke('text')
      .should('eq', 'Tool usage by day');
  });
  it('Test per tool page tool selection', () => {
    cy.visit('/#/perTool');
    cy.dataCy('tool-selector').should('exist').click();
    cy.get('[role="listbox"]').eq(0).click().wait(250);
  });
  it('Test compare page tool selection', () => {
    cy.visit('/#/compare');

    cy.dataCy('compare-selector').should('have.length', 9);
    cy.dataCy('compare-selector').eq(0).click();
    cy.dataCy('compare-selector').eq(3).click();
    cy.dataCy('compare-selector').eq(4).click();
    cy.dataCy('compare-selected').should('have.length', 3);
  });
  it('Test dark mode switch', () => {
    cy.dataCy('options-dropdown').should('be.visible').click().wait(250);
    cy.dataCy('dark-mode-selector').click();
    cy.dataCy('dark-mode-selector').click();
  });
  it('Test language selection', () => {
    cy.dataCy('chart-header')
      .should('exist')
      .invoke('text')
      .should('eq', 'Total tool usage by months');
    cy.dataCy('options-dropdown').should('be.visible').click().wait(250);
    cy.dataCy('language-selector').click();
    cy.get('[role="option"]').eq(0).click().wait(250);
    cy.dataCy('chart-header')
      .should('exist')
      .invoke('text')
      .should('eq', 'Teljes felhasználás havi bontásban');
    cy.dataCy('language-selector').click();
    cy.get('[role="option"]').eq(1).click().wait(250);
  });
});
