import { LitElement, html } from 'lit';
import styles from './graficarte-store-login-page-styles';
import 'sophos-chimera-button/sophos-chimera-button';
import 'sophos-simple-modal/sophos-simple-modal';
import getLocal from '../../../locales'

export class GraficarteStoreLoginPage extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.inputsList = [
      {
        styleOfInput: 'rounded-mobile-input',
        maxLength : 30,
        label: getLocal('graficarte-store-login-form-user-placeholder'),
        type: 'text',
        isRequired: true,
        fieldName: 'email',
        missingField: false
      },
      {
        styleOfInput: 'rounded-mobile-input',
        maxLength : 30,
        label: getLocal('graficarte-store-login-form-password-placeholder'),
        type: 'password',
        isRequired: true,
        fieldName: 'password',
        missingField: false
      }
    ];
    this._email = '';
    this._password = '';
    this.modalLabelsButtons = [
      {
      label: ''
      }, 
      {
        label: 'Cancelar'
      }
    ];
    this.missingFields = [];
    this.emptyMessage = 'Este campo es requerido';
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      inputsList : { type : Array },
      isModalOpened : { type : Boolean },
      missingFields : { type : Array }
    };
  }

  static get styles () {
    return styles;
  }

  set missingFields (value) {
    const currValue = value;
    const oldValue = this._missingFields;
    this.inputsList = this.inputsList.map(input => {
      input.missingField = currValue.includes(input.fieldName);
      return input;
    });
    this._missingFields = currValue;
    this._closeModal();
    this.requestUpdate('missingFields', oldValue);
  }

  resetEmptyFields (){
    this.inputsList = this.inputsList.map(input => {
      input.missingField = false;
      return input;
    })
  }

  createForm (){
    return this.inputsList.map(inputData => html`
      <sophos-chimera-input
        field-name=${inputData.fieldName}
        .styleOfInput=${inputData.styleOfInput}
        .maxLength=${inputData.maxLength}
        .label=${inputData.label}
        .type=${inputData.type}
        .isRequired=${inputData.isRequired}
        .showMessage=${inputData.missingField}
        .inputMessage=${this.emptyMessage}
        @sophos-input-changed=${this.setUserCredentialField}>
      </sophos-chimera-input>
      `
    );
  }

  setUserCredentialField (e){
    const field = e.target.getAttribute('field-name');
    field === 'email' ? this.setEmail(e.detail.value) : this.setPassword(e.detail.value);
  }

  setEmail (email) {
    this._email = email;
  }

  setPassword (password) {
    this._password = password;
  }

  manageLoginActions (e){
    const payload = e.detail.buttonDescription;
    const emptyFields = this.getEmptyFields();
    if(emptyFields.length > 0 && payload.key !== 'cancel' ) {
      this.missingFields = emptyFields
    } else {
      payload.option === 0 ? this._openLoginModal() : payload.option === 1 ? this._openCancelModal() : payload;
    }
  }

  _manageModalButtons (e){
    const payload = e.detail.buttonDescription;
    payload.option === 0 ? payload.key === 'store' ? this._cancel() : this._submit() : this._closeModal();
  }

  _openLoginModal (){
    this.modalTitle = 'Ingresar';
    this.modalMessage = '¿Desea continuar?';
    this.modalFooterMessage = "Graficarte";
    this.isModalOpened = true;
    this.modalLabelsButtons = [
      {
        label: 'Entrar',
        key: 'login'
      }, 
      {
        label: 'Volver',
        key: 'edit-login'
      }];
  }

  _openCancelModal (){
    this.modalTitle = 'Salir';
    this.modalMessage = '¿Desea regresar a la tienda?';
    this.modalFooterMessage = 'Graficarte';
    this.isModalOpened = true;
    this.modalLabelsButtons = [
      {
        label: 'Salir',
        key: 'store',
      }, 
      {
        label: 'Quedarse',
        key: 'edit-login',
      }];
  }

  _closeModal (){}

  _submit (){
    this._closeModal()
    const userCredentials = {
      email: this._email,
      password: this._password
    };
    this.dispatchEvent(new CustomEvent('graficarte-login-submit', { detail: {userCredentials}}));
  }

  _cancel () {
    this.dispatchEvent(new CustomEvent('graficarte-cancel-login'));
  }

  render () {
    return html`
      <div id="login-container">
        <div id="login-form-container">
          
          ${this.createForm()}
          
          <sophos-chimera-button 
          type="simple-multi-button"
          .buttonsLabels=${[
            {
              label: 'Entrar',
              key: 'login-modal'
            }, 
            {
              label: 'Cancelar',
              key: 'cancel'
            }
            ]}
          @sophos-chimera-button-click=${this.manageLoginActions} id="login-submit">Entrar</sophos-chimera-button>
        </div>
      </div>
    `;
  }
}

customElements.define('graficarte-store-login-page', GraficarteStoreLoginPage);
