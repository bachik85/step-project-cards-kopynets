import {Visit} from "./Visit.js";

class VisitCardiologist extends Visit {
    constructor(...args) {
        super(...args);
        this.elem = null;
        this.extendedOptionContainer = null;
    }

    render() {
        const {urgency, bloodPressure, bodyMassIndex, transferredDiseases, patientAge, visitPurpose, visitDescription} = this.dataObj;
        this.elem = super.render();
        this.extendedOptionContainer = this.elem.querySelector('.card__extended-options');
        this.extendedOptionContainer.innerHTML = `
		<div class="card__content">
            <span class="card__content-first">Срочность:</span>
            <span class="card__content-second">${urgency}</span>
        </div>

        <div class="card__content">
            <span class="card__content-first">Цель визита:</span>
            <span class="card__content-second">${visitPurpose}</span>
        </div>

        <div class="card__content">
            <span class="card__content-first">Описание визита:</span>
            <span class="card__content-second">${visitDescription}</span>
        </div>

         <div class="card__content">
            <span class="card__content-first">Возраст:</span>
            <span class="card__content-second">${patientAge}</span>
        </div>

        <div class="card__content">
            <span class="card__content-first">Индекс массы тела:</span>
            <span class="card__content-second">${bodyMassIndex}</span>
        </div>

        <div class="card__content">
            <span class="card__content-first">Артериальное давление:</span>
            <span class="card__content-second">${bloodPressure}</span>
        </div>

        <div class="card__content">
            <span class="card__content-first">Перенесенные заболевания:</span>
            <span class="card__content-second">${transferredDiseases}</span>
        </div>
		`;
        return this.elem;
    }
}

export {VisitCardiologist};