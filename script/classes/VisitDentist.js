import {Visit} from "./Visit.js";

class VisitDentist extends Visit {
    constructor(...args) {
        super(...args);
        this.elem = null;
        this.extendedOptionContainer = null;
    }

    render() {
        let {urgency, visitPurpose, visitDescription, dateOfLastVisit} = this.dataObj;
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
            <span class="card__content-first">Последняя дата визита:</span>
            <span class="card__content-second">${dateOfLastVisit}</span>
        </div>
		`;
        return this.elem;
    }
}

export {VisitDentist};