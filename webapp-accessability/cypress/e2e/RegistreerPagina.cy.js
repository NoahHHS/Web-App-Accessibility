describe('Registration Test', () => {
  it('Successfully registers a new user', () => {
    cy.visit('/registreer'); // Adjust URL if needed
    cy.get('input[name="accountType"][value="Ervaringsdeskundige"]').check();
    cy.get('input[type="email"]').type('newuser@example.com');
    cy.get('input[id="wachtwoord"]').type('newpassword123'); // Change the selector to target the password field
    cy.get('input[id="herhaalWachtwoord"]').type('newpassword123'); // Change the selector to target the confirm password field
    // Add other input fields as needed
    cy.get('form').submit();
    // Add assertions as needed
  });

  it('Displays an error on password mismatch', () => {
    cy.visit('/registreer');
    cy.get('input[name="accountType"][value="Bedrijf"]').check();
    cy.get('input[type="email"]').type('newuser@example.com');
    cy.get('input[id="wachtwoord"]').type('newpassword123');
    cy.get('input[id="herhaalWachtwoord"]').type('differentpassword');
    cy.get('form').submit();
    cy.get('.error-message').should('contain', 'Wachtwoorden komen niet overeen.');
  });
});
