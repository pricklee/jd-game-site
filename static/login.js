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
        console.log('Full Response:', JSON.stringify(data, null, 2));  // Pretty print the response for better inspection
        // Check if token and uuid exist, and log their structure
        console.log('Token:', data.token);
        console.log('UUID:', data.uuid);
    
        if (data.token && data.user.id && data.user && data.user.username) {
            console.log('Token:', data.token); 
            console.log('UUID:', data.user.id);
            console.log('Username:', data.user.username);
            // Set cookies
            document.cookie = `token=${data.token}; path=/; samesite=None; secure`;
            document.cookie = `uuid=${data.user.id}; path=/; samesite=None; secure`;
            document.cookie = `username=${data.user.username}; path=/; samesite=None; secure`;
    
            console.log('Cookies set:', document.cookie);
            window.location.href = '/';
        } else {
            alert('Login failed: Missing token or uuid.');
            console.error('API Response Error: Missing token or uuid');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed: ' + error.message);
    });
    
});
