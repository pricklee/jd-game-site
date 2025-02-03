document.getElementById('signup').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values from form inputs
    const name = document.getElementById('user-display').value;
    const user = document.getElementById('user-name').value;
    const mail = document.getElementById('user-email').value;
    const pass = document.getElementById('user-password').value;

    if (typeof grecaptcha === 'undefined') {
        console.error('reCAPTCHA is not available!');
        return;
    }
    const captchaResponse = grecaptcha.enterprise.getResponse();

    if (!captchaResponse) {
        alert("Please complete the CAPTCHA.");
        return;
    }

    // Prepare the data to send
    const login = JSON.stringify({
        nickname: name,
        username: user,
        email: mail,
        password: pass,
        captchaResponse: captchaResponse
    });

    // Send the data using fetch
    fetch('https://api.jammerdash.com/v1/account/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: login
    })
    .then(response => response.json())
    .then(data => {
        console.log('Full Response:', JSON.stringify(data, null, 2));  // Pretty print the response for better inspection
        // Check if token and uuid exist, and log their structure
        console.log('Token:', data.token);
        console.log('UUID:', data.uuid);
    
        if (data.token && data.uuid && data.user && data.user.username) {
            console.log('Token:', data.token); 
            console.log('UUID:', data.uuid);
            console.log('Username:', data.user.username);
            // Set cookies
            document.cookie = `token=${data.token}; path=/; samesite=None; secure`;
            document.cookie = `uuid=${data.uuid}; path=/; samesite=None; secure`;
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
