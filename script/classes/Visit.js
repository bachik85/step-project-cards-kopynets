import {ModalCreateCard} from "./ModalCreateCard.js";

class Visit {
  constructor(dataObj) {
    this.dataObj = dataObj;
    this.id = dataObj.id;
    this.elem = null;
    this.deleteButton = null;
    this.extendedOptionContainer = null;
    this.editButton = null;
    this.flagContainer = null;
  }

  render() {
    const {urgency, patientFullName, doctorType} = this.dataObj;
    this.elem = document.createElement('div');
    this.elem.className = 'card__content-container';
    this.elem.id = `card${this.id}`;
    this.elem.setAttribute('data-id', `${this.id}`);
    this.elem.setAttribute('draggable', `true`);
    this.elem.setAttribute('data-drop', `true`);

    this.flagContainer = document.createElement('div');
    this.flagContainer.className = 'card__flag';
    if (urgency === 'regular') {
      this.flagContainer.classList.add('card__urgency--regular');
    }

    if (urgency === 'priority') {
      this.flagContainer.classList.add('card__urgency--priority');
    }

    if (urgency === 'emergency') {
      this.flagContainer.classList.add('card__urgency--emergency');
    }

    this.elem.append(this.flagContainer);

    this.editButton = document.createElement('div');
    this.editButton.className = 'card__change';
    this.editButton.textContent = 'Edit';
    this.editButton.addEventListener('click', this.editCard.bind(this));
    this.editButton.setAttribute('data-drop', `false`);

    this.deleteButton = document.createElement('div');
    this.deleteButton.className = 'card__del';
    this.deleteButton.textContent = 'Delete';
    this.deleteButton.addEventListener('click', this.deleteCard.bind(this));
    this.deleteButton.setAttribute('data-drop', `false`);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'card__ico-container';
    buttonContainer.append(this.editButton);
    buttonContainer.append(this.deleteButton);
    buttonContainer.setAttribute('data-drop', `false`);

    this.elem.append(buttonContainer);
    this.elem.insertAdjacentHTML('beforeend', `
        <div class="card__content" data-drop="false">
            <span class="card__content-first" data-drop="false">ФИО:</span>
            <span class="card__content-second" data-drop="false">${patientFullName.toUpperCase()}</span>
        </div>

        <div class="card__content" data-drop="false">
            <span class="card__content-first" data-drop="false">Доктор:</span>
            <span class="card__content-second" data-drop="false">${doctorType.toUpperCase()}</span>
        </div>
        
        `);

    const showDetailsButton = document.createElement('span');
    showDetailsButton.className = 'show-more';
    showDetailsButton.innerText = 'SHOW DETAILS';
    showDetailsButton.addEventListener('click', this.showDetails.bind(this));
    showDetailsButton.setAttribute('data-drop', `false`);

    this.extendedOptionContainer = document.createElement('div');
    this.extendedOptionContainer.className = 'card__extended-options';
    this.extendedOptionContainer.setAttribute('data-drop', `false`);

    this.elem.append(showDetailsButton);
    this.elem.append(this.extendedOptionContainer);

    return this.elem;
  }

  editCard() {
    const editModal = new ModalCreateCard('edit-card', 'edit-card', 'SAVE CHANGES');
    const editModalForm = editModal.render();

    document.body.append(editModalForm);

    const editModalSelect = editModalForm.querySelector('[name="doctorType"]');
    editModalSelect.value = this.dataObj.doctorType;
    console.log(editModalSelect.value);

    editModal.chooseSelect({
      target: editModalSelect
    });


    Object.keys(this.dataObj).forEach(key => {
      if (key !== 'id') {
        editModalForm.querySelector(`[name="${key}"]`).value = this.dataObj[key];
      }
    });


    document.getElementById('edit-card').addEventListener('submit', this.deleteCard.bind(this));
  }

  async deleteCard() {
    console.log('delete');
    const config = {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    };
    const {data} = await axios.delete(`http://cards.danit.com.ua/cards/${this.id}`, config);
    if (data.status === 'Success') {
      this.elem.remove();
    } else if (data.status === 'Error') {
      alert(data.masssage);
    }

  }

  showDetails() {
    this.extendedOptionContainer.classList.toggle('card__extended-options--active');
    this.elem.classList.toggle('card__content-container--active');
  }
}

export {Visit};
