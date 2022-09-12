import { LitElement, html, css } from 'lit';
import styles from './graficarte-store-create-account-styles';
import 'sophos-chimera-input/sophos-chimera-input';
import 'sophos-chimera-button/sophos-chimera-button';
import 'sophos-simple-modal/sophos-simple-modal';
import './graficarte-create-account-form/graficarte-create-account-form';
import getLocal from '../../locales'

export class GraficarteStoreCreateAccount extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.buttonLabels = [
      {
        label: getLocal('graficarte-store-create-account-form-create-account'),
        key: 'create-account',
      },
      {
        label: getLocal('graficarte-store-create-account-form-cancel'),
        key: 'cancel',
      },
    ];
    this.userData = {};
    this.missingFields = [];
    this.passwordMessageStyle = '';
    this.emptyMessage = 'Este campo es requerido';
    this.createAccountActionsHandlers = {};
    this.modalLabelsButtons = [
      {
      label: ''
      }, 
      {
        label: 'Cancelar'
      }
    ];
    this.isPasswordValid = false;
    this.createAccountActionsHandlers = {};
    this.modalButtonsHandlers = {};
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      inputsList : { type : Array },
      userData : { type : Object },
      missingFields : { type : Array },
      passwordMessageStyle : { type : String },
      passwordMessageText : { type : String },
      isModalOpened : { type : Boolean },
      modalTitle : { type : String },
      modalMessage : { type : String },
      modalFooterMessage : { type : String },
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
    this.requestUpdate('missingFields', oldValue);
  }

  firstUpdated (){
    super.firstUpdated();

    this.modalButtonsHandlers = {
      'login' : this.createAccount,
      'back-to-store' : this.cancel,
      'close-modal' : this._closeModal,
    }
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
        key: 'close-modal'
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
        key: 'back-to-store',
      }, 
      {
        label: 'Quedarse',
        key: 'close-modal',
      }];
  }

  _openPasswordConfirmationErrorModal (){
    this.modalTitle = 'Las contraseñas no coinciden';
    this.modalMessage = 'Por favor, asegúrese que la contraseña corresponda con su confirmación';
    this.modalFooterMessage = 'Graficarte';
    this.isModalOpened = true;
    this.modalLabelsButtons = [
      {
        label: 'Aceptar',
        key: 'close-modal',
      }];
  }

  _closeModal (){
    this.modalTitle = '';
    this.modalMessage = '';
    this.modalFooterMessage = '';
    this.modalLabelsButtons = ['', ''];
    this.isModalOpened = false;
  }

  _manageModalButtons (e){
    const { key } = e.detail.buttonDescription;

    const handler = this.modalButtonsHandlers[key].bind(this);

    handler();
  }

  getEmptyFields (){
    return [
      !this.userData.name && 'name',
      !this.userData.lastName && 'lastName',
      !this.userData.phoneNumber && 'phoneNumber',
      !this.userData.email && 'email',
      !this.userData.address && 'address',
      !this.userData.password && 'password'
    ].filter(field => field);
  }

  resetEmptyFields (){
    this.inputsList = this.inputsList.map(input => {
      input.missingField = false;
      return input;
    })
  }

  showForm (){
    return this.inputsList.map(inputData => {
      return html`
      <sophos-chimera-input
        field-name=${inputData.fieldName}
        .styleOfInput=${inputData.styleOfInput}
        .maxLength=${inputData.maxLength}
        .label=${inputData.label}
        .type=${inputData.type}
        .isRequired=${inputData.isRequired}
        .showMessage=${inputData.missingField}
        .inputMessage=${this.emptyMessage}
        @sophos-input-changed=${this.createAccountActionsHandlers[inputData.handler]}>
      </sophos-chimera-input>
      `;
    });
  }

  manageCreateAccountActions (e){
    const { key } = e.detail.buttonDescription;
    const emptyFields = this.getEmptyFields();
    if(emptyFields.length > 0 && key !== 'cancel'){
      this.missingFields = emptyFields;
    } else {
      this.resetEmptyFields();
      if(key === 'create-account') {
        if(this.isPasswordValid) {
          this._openLoginModal();
        } else {
          this._openPasswordConfirmationErrorModal();
        }
      } else {
        this._openCancelModal();
      }
    }
  }

  createAccount () {
    this._closeModal();
    this.dispatchEvent(new CustomEvent('create-account', {
      detail : { userData: {...this.userData} }
    }));
  }

  cancel () {
    this.resetEmptyFields();
    this.dispatchEvent(new CustomEvent('cancel-create-account'));
  }

  _showPasswordErrorMessage () {
    this.passwordMessageStyle = 'error';
    this.passwordMessageText = 'Las contraseñas no coinciden'
    this.dispatchEvent(new CustomEvent('invalid-password'));
  }

  _showPasswordSuccessMessage () {
    this.passwordMessageStyle = 'success';
    this.passwordMessageText = 'Las contraseñas coinciden';
    this.dispatchEvent(new CustomEvent('valid-password'));
  }

  render () {
    return html`
    <div>
      <graficarte-create-account-form>
      </graficarte-create-account-form>
      <sophos-simple-modal
        modalStyle="full-screen"
        ?isModalOpened=${this.isModalOpened}
        .modalTitle=${this.modalTitle}
        .modalMessage=${this.modalMessage}
        .modalFooterMessage=${this.modalFooterMessage}>

          <sophos-chimera-button
            slot="modal-body"
            type="simple-multi-button"
            class="modal-buttons"
            .buttonsLabels=${this.modalLabelsButtons}
            @sophos-chimera-button-click=${this._manageModalButtons}>
          </sophos-chimera-button>

      </sophos-simple-modal>

      <div id=password-message-container message-style=${`password-message-${this.passwordMessageStyle}`}>
        <p id=password-message message=${this.passwordMessageStyle}>
          ${this.passwordMessageText}
        </p>
      </div>

      <sophos-chimera-button
      type=simple-multi-button
      .buttonsLabels=${this.buttonLabels}
      @sophos-chimera-button-click=${this.manageCreateAccountActions}></sophos-chimera-button>
    </div>
    `;
  }
}
customElements.define('graficarte-store-create-account', GraficarteStoreCreateAccount);
