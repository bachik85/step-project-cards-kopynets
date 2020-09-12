import FormField from "./FormField.js";

class Input extends FormField {
    constructor(type = 'text', name, placeholder, ...args) {
        super(...args);
        this.elementType = 'input';
        this.type = type;
        this.name = name;
        this.placeholder = placeholder;
        this.element = null;
    }

    render() {
        this.element = super.render(this.elementType);
        this.element.setAttribute('type', this.type);
        this.element.setAttribute('name', this.name);
        this.element.setAttribute('placeHolder', this.placeholder);
        return this.element;
    }
}
export {Input};