import {Form} from "./Form.js";

class Modal extends Form {
    constructor(...props) {
        super(...props);
        this.elem = null;
        this.closeButton = null;
    }

    render() {
        this.elem = super.render();
        this.elem.classList.add('modal');
        this.elem.classList.add('modal--show');

        this.closeButton = document.createElement('div');
        this.closeButton.className = 'modal__close-button';
        this.closeButton.textContent = 'Close';
        this.closeButton.addEventListener('click', this.closeModal.bind(this));
        this.elem.prepend(this.closeButton);

        return this.elem;
    }

    closeModal(){
        const form = document.getElementById(this.id);
        form.classList.toggle('modal--show');
        form.classList.toggle('modal--close');
        setTimeout(()=> {
           form.remove();
        });
    }

}

export {Modal};