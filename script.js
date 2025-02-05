// Function to handle user signup
function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const signupMessage = document.getElementById('signup-message');

    if (username && password) {
        // Save user data to a file (simulated here with localStorage for simplicity)
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));

        signupMessage.textContent = 'Signup successful! Redirecting to login page...';
        
        // Redirect to login page after a short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } else {
        signupMessage.textContent = 'Please enter both username and password.';
    }
}

// Function to handle user login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('login-message');

    // Retrieve user data from a file (simulated here with localStorage for simplicity)
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('username', username);
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('navbar').style.display = 'block';
        document.getElementById('content').style.display = 'block';
    } else {
        loginMessage.textContent = 'Incorrect username or password. Please try again.';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem('loggedIn') === 'true') {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('navbar').style.display = 'block';
        document.getElementById('content').style.display = 'block';
    }
});
