import FormField from "./FormField.js";

class Select extends FormField {
    constructor(name, options, ...args) {
        super(args);
        this.elementType = 'select';
        this.name = name;
        this.options = options;
        this.element = null;
    }

    render() {
        this.element = super.render(this.elementType);
        this.element.setAttribute('name', this.name);
        const HTMLArray = this.options.map(optionsObject => {
            return `<option value="${optionsObject.value}">${optionsObject.text}</option>`
        });
        this.element.innerHTML = `
        ${HTMLArray.join(' ')}
        `;
        return  this.element;
    }
}
export {Select};