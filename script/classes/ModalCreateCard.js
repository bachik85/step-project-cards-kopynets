import {Modal} from "./Modal.js";
import {VisitCardiologist} from "./VisitCardiologist.js";
import {VisitDentist} from "./VisitDentist.js";
import {VisitTherapist} from "./VisitTherapist.js";
import {Input} from "./Input.js";
import {Select} from "./Select.js";
import {postVisitCard} from "../components/postVisitCard.js";

class ModalCreateCard extends Modal {
  constructor(...props) {
    super(...props);
    this.elem = null;
    this.extendedOptionsContainer = null;
    this.cardContainer = document.getElementById('card__main-container');
    this.cardFieldArray = [
      new Input('text', 'patientFullName', 'ФИО', '[:alpha:]', 'only letters please'),
      new Select('doctorType', [
        {text: 'Choose doctor', value: ''},
        {text: 'Cardiologist', value: 'cardiologist'},
        {text: 'Dentist', value: 'dentist'},
        {text: 'Therapist', value: 'therapist'},
      ]),
    ];

    this.extendedOptionsArray = {
      cardiologist: [
        new Input('text', 'visitPurpose', 'Цель визита'),
        new Input('text', 'visitDescription', 'Описание визита'),
        new Select('urgency', [
          {text: 'Срочность', value: ''},
          {text: 'Срочная', value: 'emergency'},
          {text: 'Приоритетная', value: 'priority'},
          {text: 'Регулярная', value: 'regular'},
        ]),
        new Input('text', 'bloodPressure', 'Артериальное давление'),
        new Input('text', 'bodyMassIndex', 'Индекс массы тела'),
        new Input('text', 'transferredDiseases', 'Перенесенные заболевания'),
        new Input('text', 'patientAge', 'Возраст')
      ],

      dentist: [
        new Input('text', 'visitPurpose', 'Цель визита'),
        new Input('text', 'visitDescription', 'Описание визита'),
        new Select('urgency', [
          {text: 'Срочность', value: ''},
          {text: 'Срочная', value: 'emergency'},
          {text: 'Приоритетная', value: 'priority'},
          {text: 'Регулярная', value: 'regular'},
        ]),
        new Input('text', 'dateOfLastVisit', 'Дата последнего визита'),
      ],

      therapist: [
        new Input('text', 'visitPurpose', 'Цель визита'),
        new Input('text', 'visitDescription', 'Описание визита'),
        new Select('urgency', [
          {text: 'Срочность', value: ''},
          {text: 'Срочная', value: 'emergency'},
          {text: 'Приоритетная', value: 'priority'},
          {text: 'Регулярная', value: 'regular'},
        ]),
        new Input('text', 'patientAge', 'Возраст')
      ],
    }
  }

  render() {
    this.elem = super.render();
    this.cardFieldArray.forEach(element => this.submitButton.before(element.render()));
    this.elem.addEventListener('submit', this.createCard.bind(this));
    this.elem.querySelector('select').addEventListener('change', this.chooseSelect.bind(this));

    this.extendedOptionsContainer = document.createElement('div');
    this.extendedOptionsContainer.id = 'modal__extended-options';
    this.extendedOptionsContainer.className = 'modal__extended-options';
    this.submitButton.before(this.extendedOptionsContainer);

    return this.elem;
  }

  chooseSelect({target}) {
    this.extendedOptionsContainer.innerHTML = '';
    this.extendedOptionsArray[target.value].forEach(element => this.extendedOptionsContainer.append(element.render()));
  }

  async createCard(event) {
    event.preventDefault();
    const noVisitSpan = document.getElementById('noVisitsSpan');
    const body = this.serializeJSON();
    const response = await postVisitCard(body);

    if (response.doctorType === "cardiologist") {
      this.cardContainer.append(new VisitCardiologist(response).render())
    } else if (response.doctorType === "dentist") {
      this.cardContainer.append(new VisitDentist(response).render())
    } else if (response.doctorType === "therapist") {
      this.cardContainer.append(new VisitTherapist(response).render())
    }
    if (noVisitSpan) {
      noVisitSpan.remove();
    }
    this.closeModal();
  }
}

export {ModalCreateCard};