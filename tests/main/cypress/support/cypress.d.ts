declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-testid attribute.
       * @example cy.dataTestId('email')
      */
      dataTestId: (id: string) => Chainable<JQuery<HTMLElement>>
    }
  }
}

export {}
