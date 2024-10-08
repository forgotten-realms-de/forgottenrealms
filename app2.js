document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const statusElement = document.getElementById('status');
    
    if (password !== confirmPassword) {
        statusElement.textContent = 'Passwords do not match!';
        statusElement.style.color = 'red';
        return;
    }
    
    // Normally, you'd send the data to the server for registration
    // For now, we'll just simulate successful registration
    statusElement.textContent = `Registering ${username}...`;
    statusElement.style.color = 'green';
    
    setTimeout(() => {
        statusElement.textContent = `Successfully registered! Welcome, ${username}`;
    }, 1500);
});