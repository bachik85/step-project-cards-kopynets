import {VisitDentist} from "../classes/VisitDentist.js";
import {VisitCardiologist} from "../classes/VisitCardiologist.js";
import {VisitTherapist} from "../classes/VisitTherapist.js";
import {getAllCard} from "./getAllCards.js";

const filterInput = document.getElementById('filter__input');
const filterSelect = document.getElementById('filter__select');

filterInput.addEventListener('input', filterInputFunction);

async function filterInputFunction({target}){
    let cardContainer =  document.getElementById('card__main-container');
    let value = target.value.toLowerCase();

    const response = await getAllCard();
    cardContainer.innerText = '';

    response.forEach(element => {
        if (element.doctorType.toLowerCase().includes(value)
            || element.patientFullName.toLowerCase().includes(value)
            || element.visitDescription.toLowerCase().includes(value)
            || element.visitPurpose.toLowerCase().includes(value)) {
            if (element.doctorType === "cardiologist") {
                cardContainer.append(new VisitCardiologist(element).render())
            } else if (element.doctorType === "dentist") {
                cardContainer.append(new VisitDentist(element).render())
            } else if (element.doctorType === "therapist") {
                cardContainer.append(new VisitTherapist(element).render())
            }
        }
    })
}

filterSelect.addEventListener('change', filterSelectFunction);

async function filterSelectFunction({target}){
    let cardContainer =  document.getElementById('card__main-container');
    let value = target.value.toLowerCase();

    const response = await getAllCard();

    console.log(response);
    cardContainer.innerText = '';
    if (value === 'all') {
        response.forEach(element => {
            if (element.doctorType === "cardiologist") {
                cardContainer.append(new VisitCardiologist(element).render())
            } else if (element.doctorType === "dentist") {
                cardContainer.append(new VisitDentist(element).render())
            } else if (element.doctorType === "therapist") {
                cardContainer.append(new VisitTherapist(element).render())
            }
        })
    } else {
        response.forEach(element => {
            if (element.urgency.toLowerCase() === value) {
                if (element.doctorType === "cardiologist") {
                    cardContainer.append(new VisitCardiologist(element).render())
                } else if (element.doctorType === "dentist") {
                    cardContainer.append(new VisitDentist(element).render())
                } else if (element.doctorType === "therapist") {
                    cardContainer.append(new VisitTherapist(element).render())
                }
            }
        })
    }
}
