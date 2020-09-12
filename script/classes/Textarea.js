import FormField from "./FormField.js";

class TextArea extends FormField {
    constructor(name, placeholder, ...args) {
        super(args);
        this.elementType = 'textarea';
        this.name = name;
        this.placeholder = placeholder;
        this.element = null;
    }

    render() {
        this.element = super.render(this.elementType);
        this.element.setAttribute('name', this.name);
        this.element.setAttribute('placeHolder', this.placeholder);
        return  this.element;
    }
}
export {TextArea};