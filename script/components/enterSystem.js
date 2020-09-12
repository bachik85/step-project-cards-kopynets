async function enterSystem(event) {
		event.preventDefault();
		const loginButton = document.getElementById('log-in');
		const createVisitButton = document.getElementById('create-visit');
		const body = {
			email: this.querySelector('[name="login"]').value,
			password: this.querySelector('[name="password"]').value,
		};

		const {data} = await axios.post('http://cards.danit.com.ua/login', body);
		if (data.status === "Success") {
			localStorage.setItem('token', data.token);
			this.classList.remove('modal-authorization--active');
			loginButton.style.display = 'none';
			createVisitButton.style.display = 'unset';
			document.location.reload(true);

		} else if (data.status === "Error") {
			alert(data.message);
		}
}

export {enterSystem};