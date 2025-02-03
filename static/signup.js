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
        alert("Account successfully created! Welcome to Jammer Dash!");
        window.location.href = "/";
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed: ' + error.message);
    });
});
