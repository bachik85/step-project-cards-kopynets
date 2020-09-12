import {onOpenPageLogin} from "./onOpenPageLogin.js";
import {getAllCard} from "./getAllCards.js";
import {ModalCreateCard} from "../classes/ModalCreateCard.js";
import {VisitCardiologist} from "../classes/VisitCardiologist.js";
import {VisitDentist} from "../classes/VisitDentist.js";
import {VisitTherapist} from "../classes/VisitTherapist.js";

onOpenPageLogin();

document.getElementById('create-visit').addEventListener('click', ()=> {
    document.body.append(new ModalCreateCard('createCardModal', 'CREATE VISIT').render());
});


async function createAllVisit() {
    const cardContainer = document.getElementById('card__main-container');
    const response = await getAllCard();
    if (response.length === 0) {
        cardContainer.innerHTML = '<h1 draggable="false" id="noVisitsSpan">NO VISITS</h1>';
    } else {
        response.forEach(element => {
            if (element.doctorType === "cardiologist") {
                cardContainer.append(new VisitCardiologist(element).render())
            } else if (element.doctorType === "dentist") {
                cardContainer.append(new VisitDentist(element).render())
            } else if (element.doctorType === "therapist") {
                cardContainer.append(new VisitTherapist(element).render())
            }
        })

    }
}

createAllVisit();

export {createAllVisit}