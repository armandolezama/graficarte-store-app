import { LitElement, html } from 'lit';
import styles from './graficarte-store-client-form-styles';
import getLocal from '../../../../locales';

export class GraficarteStoreClientForm extends LitElement {
  
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.clientForm = [
      {
        label: getLocal('graficarte-store-client-profile-client-name'),
        fieldName: 'client-name',
        type: 'text',
        isDisabled: true,
        value: '',
      },
      {
        label: getLocal('graficarte-store-client-profile-client-lastName'),
        fieldName: 'client-lastName',
        type: 'text',
        isDisabled: true,
        value: '',
      },
      {
        label: getLocal('graficarte-store-client-profile-client-phone-number'),
        fieldName: 'client-phone-number',
        type: 'text',
        isDisabled: true,
        value: '',
      },
      {
        label: getLocal('graficarte-store-client-profile-client-address'),
        fieldName: 'client-address',
        type: 'text',
        isDisabled: true,
        value: '',
      },
    ]
  }

  static get styles () {
    return styles;
  }

  editField (e){
    const field = e.target.getAttribute('field-name');
    const editableField = this.clientForm.find(input => input.fieldName === field);
    editableField.isDisabled = false;
    this.requestUpdate();
  }

  savefield (e){
    const field = e.target.getAttribute('field-name');
    const editableField = this.clientForm.find(input => input.fieldName === field);
    editableField.value = e.detail.value;
  }

  createForm (){
    return this.clientForm.map(inputForm => html`
    <div class="input-form-container">
      <sophos-chimera-input
        class="form-input"
        field-name=${inputForm.fieldName}
        maxLength="20"
        .styleOfInput=${this.clientInputStyle}
        .label=${inputForm.label}
        .type=${inputForm.type}
        .value=${inputForm.value}
        ?isDisabled=${inputForm.isDisabled}
        @sophos-input-changed=${this.savefield}>
      </sophos-chimera-input>
      <div class="input-form-button">
        <sophos-chimera-button
          class="form-button"
          field-name=${inputForm.fieldName}
          .type=${this.clientButtonStyle}
          .buttonsLabels=${[this.clientEditButtonMessage]}
          @sophos-chimera-button-click=${this.editField}>
        </sophos-chimera-button>
      </div>
    </div>
  `)
  }

  render () {
    return html`${this.createForm()}`;
  }
}
customElements.define('graficarte-store-client-form', GraficarteStoreClientForm);
