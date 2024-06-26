/**
 * secenario testing e2e for login
 * should log in with valid credentials
 * should display login page correctly
 * should display error with invalid credentials
 * should display alert when password is empty
 * should display alert when username is empty
 */
describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });
  it('should log in with valid credentials', () => {
    // Mengisi formulir login dengan kredensial yang valid
    cy.get('input[type="text"]').type('abdul11@gmail.com');
    cy.get('input[type="password"]').type('12345678');

    // // Mengklik tombol login
    cy.get('button').contains('Login').click();

    // // Memeriksa apakah pengguna telah berhasil login
    cy.url().should('include', '/'); // Mengasumsikan bahwa setelah login, pengguna diarahkan ke halaman dashboard
    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('nav').contains(/^Home$/).should('be.visible');
    cy.get('button').contains(/^Sign out$/).should('be.visible');
  });

  it('should display login page correctly', () => {
    // cy.visit('http://localhost:5173/');

    // memverifikasi elemen yang harus tampak pada halaman login
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
    // mengisi username
    cy.get('input[placeholder="Email"]').type('testuser@gmail.com');

    // klik tombol login tanpa mengisi password
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });
  it('should display alert when username is empty', () => {
    // mengisi username
    cy.get('input[placeholder="Password"]').type('testuser');

    // klik tombol login tanpa mengisi password
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });
});
