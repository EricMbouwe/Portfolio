const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const comment = document.getElementById('comment');
const loader = document.getElementById('loader');
const submitStatus = document.getElementById('submitStatus');
const submitStatusText = document.getElementById('submitStatusText');

// helper functions
function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-group error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-group success';
}

function resetSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-group';
}

function isEmail(email) {
	return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email,
	);
}

function setStatusOnFormSubmit(element, message, clas) {
	setTimeout(() => {
		const statusContainer = element.parentElement;
		statusContainer.style.display = 'block';
		statusContainer.className = `submit-status ${clas}`;
		element.innerText = message;
	}, 1100);
}

const resetForm = () => {
	name.value = '';
	email.value = '';
	comment.value = '';
  resetSuccessFor(name);
  resetSuccessFor(email);
  resetSuccessFor(comment);
};

function checkInputs() {
	const nameValue = name.value.trim();
	const emailValue = email.value.trim();
	const commentValue = comment.value.trim();
	const errorMessages = document.querySelectorAll('.error-message');

	errorMessages.forEach(small => (small.innerText = ''));
	loader.style.display = 'inline-block';

	setTimeout(() => {
		if (nameValue === '') {
			setErrorFor(name, "Name can't be blank");
		}

		if (emailValue === '') {
			setErrorFor(email, "Email can't be blank");
		} else if (!isEmail(emailValue)) {
			setErrorFor(email, 'The e-mail address entered is invalid');
		}

		if (commentValue === '') {
			setErrorFor(comment, "Message can't be blank");
		}

		loader.style.display = 'none';
	}, 1000);

	if (nameValue !== '' && commentValue !== '' && isEmail(emailValue)) {
		return true;
	}

	return false;
}

// key down listener functions
name.onkeyup = () => {
	const nameVal = name.value.trim();
	if (nameVal !== '') {
		setSuccessFor(name);
	} else {
		setErrorFor(name, 'Enter your name please');
	}
};

email.onkeyup = () => {
	const emailVal = email.value.trim();
	if (isEmail(emailVal)) {
		setSuccessFor(email);
	} else {
		setErrorFor(email, 'Your email is not valid');
	}
};

comment.onkeyup = () => {
	const commentVal = comment.value.trim();
	if (commentVal !== '') {
		setSuccessFor(comment);
	} else {
		setErrorFor(comment, 'Say Hello!!');
	}
};

// EmailJs setup
(function () {
	emailjs.init('user_ZAXv29kjr2dMbSkCO1CpC');
})();

//Submit function
window.onload = function () {
	document.getElementById('form').addEventListener('submit', function (e) {
		e.preventDefault();
		submitStatus.style.display = 'none';

		if (checkInputs()) {
			emailjs
				.sendForm('service_i9b26wh', 'template_ywk08vq', 'form')
				.then(
					function () {
						setStatusOnFormSubmit(
							submitStatusText,
							'Thanks, your message has been sent!',
							'success',
						);
						resetForm();
						console.log('SUCCESS!');
					},
					function (error) {
						setStatusOnFormSubmit(
							submitStatusText,
							'Oups, your message has not been sent!',
						);
						console.log('FAILED...', error);
					},
				);
		} else {
			setStatusOnFormSubmit(
				submitStatusText,
				'Sorry, one or more fields have an error. Please check and try again.',
				'error',
			);
			console.log('Errors in the form');
		}
	});
};
