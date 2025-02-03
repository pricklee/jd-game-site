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
        console.log('Success:', data);
        window.location.href = "https://game.jammerdash.com/";
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Error: " + error);
    });
});
