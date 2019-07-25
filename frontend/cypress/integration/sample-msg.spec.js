/// <reference types="Cypress" />

describe('Fetch welcome message from server and show it', () => {

    it('Fetch welcome message from server and show it', () => {
        cy.visit('http://localhost:3000');
        cy.get('[data-testid="messageText"]')
        .contains('Yes, server is ready to serve!');
    });

});
