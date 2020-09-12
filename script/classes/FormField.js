class FormField {
    constructor(validationRegExp = '', errorMessage = 'Some error') {
        this.validationRegExp = validationRegExp;
        this.errorMessage = errorMessage;
        this.element = null;
        this.errorP = null;
    }

    render(element) {
        this.element = document.createElement(element);
        this.element.addEventListener('focus', this.deleteError.bind(this));
        this.element.addEventListener('blur', this.validateField.bind(this));
        return this.element;
    }

    validateField(){
        if(!(this.element.value.match(new RegExp(this.validationRegExp))) && this.element.value !== '') {
            this.showError()
        }
    }

    deleteError() {
        if(this.errorP) {
            this.errorP.remove();
        }
    }

    showError(){
        this.element.value = '';
        this.errorP = document.createElement('p');
        this.errorP.setAttribute('class', 'error');
        this.errorP.innerHTML = this.errorMessage;
        this.element.after(this.errorP);
    }
}

export default FormField;