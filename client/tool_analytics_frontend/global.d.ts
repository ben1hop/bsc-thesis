declare global {
  interface Window {
    store: {
      perToolStore: unknown;
    };
    Cypress?: Cypress.Cypress;
  }
}
