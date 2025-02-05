// Function to handle user signup
async function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const signupMessage = document.getElementById('signup-message');

    if (username && password) {
        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const message = await response.text();
            signupMessage.textContent = message;

            if (response.ok) {
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            }
        } catch (error) {
            signupMessage.textContent = 'Error during signup. Please try again.';
        }
    } else {
        signupMessage.textContent = 'Please enter both username and password.';
    }
}

// Function to handle user login
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('login-message');

    if (username && password) {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const message = await response.text();
            loginMessage.textContent = message;

            if (response.ok) {
                sessionStorage.setItem('loggedIn', 'true');
                sessionStorage.setItem('username', username);
                document.getElementById('login-container').style.display = 'none';
                document.getElementById('navbar').style.display = 'block';
                document.getElementById('content').style.display = 'block';
            }
        } catch (error) {
            loginMessage.textContent = 'Error during login. Please try again.';
        }
    } else {
        loginMessage.textContent = 'Please enter both username and password.';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem('loggedIn') === 'true') {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('navbar').style.display = 'block';
        document.getElementById('content').style.display = 'block';
    }
});
