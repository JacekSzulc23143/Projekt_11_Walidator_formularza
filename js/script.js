const username = document.querySelector("#username");
const pass = document.querySelector("#password");
const pass2 = document.querySelector("#password2");
const email = document.querySelector("#email");
const clearBtn = document.querySelector(".clear");
const sendBtn = document.querySelector(".send");
const popup = document.querySelector(".popup");

// funkcja pokazująca error
const showError = (input, msg) => {
	// argument INPUT przechowuje nasze INPUTy
	// argument MSG przechowuje placeholder

	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector(".error-text");

	formBox.classList.add("error");
	errorMsg.textContent = msg;
};

// funkcja usuwająca error
const clearError = input => {
	const formBox = input.parentElement;
	formBox.classList.remove("error");
};

// funkcja sprawdzająca formularz
// argument INPUT z funkcji "checkForm" przechowuje tablicę z naszymi inputami
// argument EL odnosi się do każdej zmiennej, którą umieściliśmy w tablicy
const checkForm = input => {
	input.forEach(el => {
		if (el.value === "") {
			// console.log(el);
			// console.log(el.placeholder);
			showError(el, el.placeholder);
		} else {
			clearError(el);
		}
	});
};

// funkcja sprawdzająca długość znaków
const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(
			input,
			`${input.previousElementSibling.innerText.slice(
				0,
				-1
			)} musi składać się z minimum ${min} znaków.`
		);
	}
};

// funkcja sprawdzająca zgodność haseł w obydwu polach input
const checkPassword = (pass1, pass2) => {
	if (pass1.value !== pass2.value) {
		showError(pass2, "Hasła do siebie nie pasują.");
	}
};

// funkcja sprawdzająca poprawność składni adresu e-mail
const checkMail = email => {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(email.value)) {
		clearError(email);
	} else {
		showError(email, "e-mail jest niepoprawny");
	}
};

// przycisk Wyczyść
clearBtn.addEventListener("click", e => {
	e.preventDefault();

	[username, pass, pass2, email].forEach(el => {
		el.value = "";
	});
});

// przycisk Wyślij
sendBtn.addEventListener("click", e => {
	e.preventDefault();

	checkForm([username, pass, pass2, email]);
	checkLength(username, 3);
	checkLength(pass, 8);
	checkPassword(pass, pass2);
	checkMail(email);
});
