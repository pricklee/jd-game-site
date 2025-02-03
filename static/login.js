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

        if (data.token && data.uuid) {
            document.cookie = `token=${data.token}; path=/; secure; samesite=strict`;
            document.cookie = `uuid=${data.uuid}; path=/; secure; samesite=strict`;
            document.cookie = `username=${user}; path=/; secure; samesite=strict`;
            window.location.href = '/';
        } else {
            alert('Login failed: token is null.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Login failed: ' + error.message);
    });
});
