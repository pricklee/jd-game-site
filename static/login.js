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
        body: login
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        
        // Setting cookies
        document.cookie = `token=${data.token}; path=/; samesite=None; secure`;
        document.cookie = `uuid=${data.uuid}; path=/; secure; samesite=strict`;
        document.cookie = `username=${data.user.username}; path=/; secure; samesite=strict`;
        
        // Debug log
        console.log('Cookies set:', document.cookie);
   
        window.location.href = '/';
    })
   
});
