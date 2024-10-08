// Load users from users.json (simulate file-based storage with localStorage for now)
function loadUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Save users to users.json (simulate with localStorage)
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
document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const statusElement = document.getElementById('status');

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

    if (userExists) {
        statusElement.textContent = 'Username is already taken!';
        return;
    }

    // Register user
    users.push({ username, password });
    saveUsers(users);

    statusElement.textContent = 'User registered successfully!';
    statusElement.style.color = 'green';
});

// Login Form Handler
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const loginStatus = document.getElementById('loginStatus');

    const users = loadUsers();
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
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
    } else {
        loginStatus.textContent = 'Invalid username or password!';
    }
});