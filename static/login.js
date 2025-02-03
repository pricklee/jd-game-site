document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const user = document.getElementById('user-name').value;
    const pass = document.getElementById('user-password').value;

    const login = JSON.stringify({
        username: user,
        password: pass
    });

    const url = 'https://api.jammerdash.com/v1/account/login';

    // Ensure HTTPS
    if (!url.startsWith('https')) {
        alert('Login failed: insecure connection.');
        return;
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: login,
        credentials: 'include'  // Required for cross-origin cookie handling
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);  // Check the full response
        console.log('Token:', data.token);
        console.log('UUID:', data.uuid);
    
        // Ensure that the token and uuid exist before proceeding
        if (data.token && data.uuid && data.user && data.user.username) {
            // Setting cookies
            document.cookie = `token=${data.token}; path=/; samesite=None; secure`;
            document.cookie = `uuid=${data.uuid}; path=/; samesite=None; secure`;
            document.cookie = `username=${data.user.username}; path=/; samesite=None; secure`;
    
            console.log('Cookies set:', document.cookie);
            window.location.href = '/'; // Redirect after successful login
        } else {
            alert('Login failed: Missing token or uuid.');
        }
    })
    
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed: ' + error.message);
    });
});
