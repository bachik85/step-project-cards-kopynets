import {enterSystem} from "./enterSystem.js";
import {ModalLogin} from "../classes/ModalLogin.js";

function onOpenPageLogin(){
    const loginButton = document.getElementById('log-in');
    const loginForm = document.getElementById('modal__login');
    const createVisitButton = document.getElementById('create-visit');

    if (localStorage.getItem('token')) {
        loginButton.style.display = 'none';
        createVisitButton.style.display = 'unset';
    }


    loginButton.addEventListener('click', function() {
       const loginForm = new ModalLogin('loginForm', 'login-form', 'LOG IN');
        document.body.append(loginForm.render());
    });

}

export {onOpenPageLogin}
