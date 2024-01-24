describe('Login Test', () => {
  it('Successfully logs in', () => {
    cy.visit('/login'); // Adjust URL if needed
    cy.get('input[type="email"]').type('user@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('form').submit();
    cy.url().should('include', '/'); // Adjust expected URL after login
  });

  it('Displays an error on wrong credentials', () => {
    cy.visit('/login');
    cy.get('input[type="email"]').type('wronguser@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('form').submit();
    cy.get('.error-message').should('be.visible');
  });
});
