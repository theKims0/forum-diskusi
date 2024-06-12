// Successful Login Test:

// Fills the login form with valid credentials.
// Clicks the login button.
// Verifies the URL changes to indicate successful login.
// Checks for the visibility of a "Sign out" button to confirm that the user is authenticated.
// Login Page Display Test
// Verifies the presence of the email and password input fields and the login button on
// the login page
// Invalid Credentials Test:

// Attempts to log in with invalid credentials.
// Verifies an alert message indicating wrong email or password.
// Empty Password Field Test:

// Attempts to log in with an empty password field.
// Verifies an alert message indicating the password field is required.
// Empty Email Field Test:

// Attempts to log in with an empty email field.
// Verifies an alert message indicating the email field is required.
// Navigation to Registration Page Test:

// Clicks on the "Register here" link.
// Verifies that the URL includes /register, indicating navigation to the registration page.
describe('Login specs', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should log in with valid credentials', () => {
    // Mengisi formulir login dengan kredensial yang valid
    cy.get('input[type="text"]').type('abdul11@gmail.com');
    cy.get('input[type="password"]').type('12345678');

    // Mengklik tombol login
    cy.get('button').contains('Login').click();

    // Memeriksa apakah pengguna telah berhasil login
    cy.url().should('include', '/'); // Mengasumsikan bahwa setelah login, pengguna diarahkan ke halaman dashboard

    // Memeriksa elemen yang hanya ada saat login berhasil, misalnya tombol Sign out
    cy.get('button').contains(/^Sign out$/).should('be.visible');
  });

  it('should display login page correctly', () => {
    // Memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display error with invalid credentials', () => {
    // Mengisi formulir login dengan kredensial yang tidak valid
    cy.get('input[type="text"]').type('invalid@email.com');
    cy.get('input[type="password"]').type('invalidpassword');

    // Mengklik tombol login
    cy.get('button').contains('Login').click();

    // Memeriksa apakah pesan kesalahan ditampilkan
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display alert when password is empty', () => {
    // Mengisi username
    cy.get('input[placeholder="Email"]').type('testuser@gmail.com');

    // Klik tombol login tanpa mengisi password
    cy.get('button').contains(/^Login$/).click();

    // Memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when username is empty', () => {
    // Mengisi password
    cy.get('input[placeholder="Password"]').type('testuser');

    // Klik tombol login tanpa mengisi email
    cy.get('button').contains(/^Login$/).click();

    // Memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should navigate to registration page', () => {
    // Mengklik tautan "Register here"
    cy.contains('Register here').click();

    // Memeriksa apakah pengguna diarahkan ke halaman pendaftaran
    cy.url().should('include', '/register');
  });
});
