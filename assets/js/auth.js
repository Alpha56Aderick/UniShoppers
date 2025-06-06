// auth.js - Sample authentication logic
// Authentication functionality
document.addEventListener('DOMContentLoaded', function() {
    // Toggle between login and register forms
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const loginForm = document.querySelector('.auth-form');
    const registerForm = document.getElementById('register-form');
    
    if (showRegister && showLogin) {
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
        });
        
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
        });
    }
    
    // Form submissions
    const loginFormElem = document.getElementById('login-form');
    const registerFormElem = document.getElementById('registration-form');
    
    if (loginFormElem) {
        loginFormElem.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // In a real app, you would validate credentials with a server
            // For demo, we'll just store the email in localStorage
            localStorage.setItem('userEmail', email);
            alert('Login successful!');
            window.location.href = 'index.html';
        });
    }
    
    if (registerFormElem) {
        registerFormElem.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const confirm = document.getElementById('reg-confirm').value;
            
            if (password !== confirm) {
                alert('Passwords do not match');
                return;
            }
            
            // In a real app, you would send this data to a server
            // For demo, we'll just store the email in localStorage
            localStorage.setItem('userEmail', email);
            alert('Registration successful! You are now logged in.');
            window.location.href = 'index.html';
        });
    }
});