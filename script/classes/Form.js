class Form {
    constructor(id, className, submitButtonValue) {
        this.id = id;
        this.className = className;
        this.submitButtonValue = submitButtonValue;
        this.elem = null;
        this.submitButton = null;
    }

    render() {
        this.elem = document.createElement('form');
        this.elem.className = this.className;
        this.elem.id = this.id;

        this.submitButton = document.createElement('input');
        this.submitButton.type = 'submit';
        this.submitButton.value = this.submitButtonValue;
        this.elem.append(this.submitButton);

        return this.elem;
    }

    serializeJSON() {
        const body = {};
        const form = document.getElementById(this.id);
        form.querySelectorAll('input,  select, textarea').forEach(element => {
            const name = element.getAttribute('name');
            if (name) {
                body[name] = element.value;
            }
        });
		return body;
    }
}

export {Form};