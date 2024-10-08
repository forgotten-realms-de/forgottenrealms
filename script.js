// Load users from localStorage (simulate file-based storage)
function loadUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Save users to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Fetch Minecraft UUID using Mojang API
async function fetchMinecraftUUID(username) {
    const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
    if (response.ok) {
        const data = await response.json();
        return data.id; // UUID
    } else {
        return null;
    }
}

// Register Form Handler
document.getElementById('registerForm')?.addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const statusElement = document.getElementById('status');

    // Reset status message
    statusElement.textContent = '';

    // Check if passwords match
    if (password !== confirmPassword) {
        statusElement.textContent = 'Passwords do not match!';
        return;
    }

    // Validate Minecraft username
    const uuid = await fetchMinecraftUUID(username);
    if (!uuid) {
        statusElement.textContent = 'Minecraft username does not exist!';
        return;
    }

    const users = loadUsers();
    const userExists = users.some(user => user.username === username);

    // Check if username already exists
    if (userExists) {
        statusElement.textContent = 'This account already exists!';
        return;
    }

    // Register user
    users.push({ username, password });
    saveUsers(users);

    statusElement.textContent = 'User registered successfully!';
    statusElement.style.color = 'green';

    // Redirect to login page after successful registration
    setTimeout(() => {
        window.location.href = 'login.html';  // Redirect to login page
    }, 2000);  // Wait for 2 seconds before redirecting
});

// Login Form Handler
document.getElementById('loginForm')?.addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent default form submission

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const loginStatus = document.getElementById('loginStatus');

    // Reset login status message
    loginStatus.textContent = '';

    const users = loadUsers();
    const user = users.find(user => user.username === username);

    // Check if the user exists
    if (!user) {
        loginStatus.textContent = 'Invalid username or password!';
        return;
    }

    // Check if the password is correct
    if (user.password !== password) {
        loginStatus.textContent = 'Wrong password!';
        return;
    }

    // Successful login
    loginStatus.textContent = '';
    document.getElementById('welcomeText').textContent = `Welcome, ${username}!`;

    // Fetch the player's Minecraft head image
    const uuid = await fetchMinecraftUUID(username);
    if (uuid) {
        const playerHeadImgUrl = `https://crafatar.com/avatars/${uuid}?size=64&overlay`;
        document.getElementById('playerHead').src = playerHeadImgUrl;
    }

    // Show welcome message and player head
    document.getElementById('welcomeMessage').style.display = 'block';

    // Redirect to the main page after successful login
    setTimeout(() => {
        window.location.href = 'index.html';  // Redirect to home or main page
    }, 2000);  // Wait for 2 seconds before redirecting
});