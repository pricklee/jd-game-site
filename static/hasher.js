async function hash(message) {
	const algorithm = 'sha-256';

	const encoder = new TextEncoder();
	const data = encoder.encode(message);

	const digest = await window.crypto.subtle.digest(algorithm, data);

	const hashArray = Array.from(new Uint8Array(digest));

	const hashHex = hashArray
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
	
	return hashHex;
}

function rememberChecked() {
	const rememberButton = document.getElementById('user-remember');

	return rememberButton.value;
}

/**
 * @param {SubmitEvent} event event
 */
async function onSubmit(event) {
	event.preventDefault();

	/** @type {HTMLFormElement} */
	const form = document.forms['login'];

	const getp = name => form.elements.namedItem(name).value;

	const name = getp('user-name');
	const pass = await hash(getp('user-password'));
	const remember = rememberChecked();

	const body = JSON.stringify({
		username: name,
		password: pass,
		remember: remember
	});

	
}


document.getElementById('login').onsubmit = onSubmit;