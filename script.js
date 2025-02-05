function login() {
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('login-message');

    // Define the correct password
    const correctPassword = 'animal123';

    if (password === correctPassword) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    } else {
        loginMessage.textContent = 'Incorrect password. Please try again.';
    }
}
