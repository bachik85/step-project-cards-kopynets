import {Modal} from "./Modal.js";
import {Input} from "./Input.js";

class ModalLogin extends Modal {
    constructor(...props) {
        super(...props);
        this.elem = null;
        this.loginFieldArray = [
            new Input('text', 'email', 'email' ),
            new Input('password', 'password', 'password'),
        ];
    }

    render(){
        this.elem = super.render();
        this.loginFieldArray.forEach(element => this.submitButton.before(element.render()));
        this.elem.addEventListener('submit', this.login.bind(this));

        return this.elem;
    }

    async login(event){
        event.preventDefault();
        const body = this.serializeJSON();
        const loginButton = document.getElementById('log-in');
        const createVisitButton = document.getElementById('create-visit');

        const {data} = await axios.post('http://cards.danit.com.ua/login', body);
        if (data.status === "Success") {
            alert('Успешный вход!');
            localStorage.setItem('token', data.token);
            loginButton.style.display = 'none';
            createVisitButton.style.display = 'unset';
            console.log('token: ', data.token);
            this.closeModal();
            document.location.reload(true);
        } else if (data.status === "Error") {
            alert(data.message);
        }
    }
}

export {ModalLogin};