document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Normally you'd send the username and password to the server for validation.
    // For now, we just display a message.
    const statusElement = document.getElementById('status');
    statusElement.textContent = `Logging in as ${username}...`;
    
    // Simulate successful login for demo purposes
    setTimeout(() => {
        statusElement.textContent = `Welcome, ${username}!`;
    }, 1500);
});

// GitHub login handling
document.getElementById('githubLogin').addEventListener('click', function() {
    const clientID = 'YOUR_GITHUB_CLIENT_ID';
    const redirectURI = 'YOUR_REDIRECT_URI'; // The URL that GitHub will redirect to after login

    // GitHub OAuth URL for login
    const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=user`;

    // Redirect the user to GitHub login
    window.location.href = githubLoginUrl;
});