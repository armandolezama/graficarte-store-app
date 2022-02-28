import { LitElement, html, css } from 'lit';
import 'sophos-chimera-input/sophos-chimera-input';
import 'sophos-chimera-button/sophos-chimera-button';
import getLocal from '../locales/'

export class GraficarteStoreCreateAccount extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.inputsList = [
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-name-placeholder'),
        type: 'text',
        isRequired: true,
        fieldName: 'name',
        handler: 'set data',
        missingField: false
      },
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-last-name-placeholder'),
        type: 'text',
        isRequired: true,
        fieldName: 'lastName',
        handler: 'set data',
        missingField: false
      },
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-phone-number-placeholder'),
        type: 'text',
        isRequired: true,
        fieldName: 'phoneNumber',
        handler: 'set data',
        missingField: false
      },
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-email-placeholder'),
        type: 'email',
        isRequired: true,
        fieldName: 'email',
        handler: 'set data',
        missingField: false
      },
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-address-placeholder'),
        type: 'text',
        isRequired: true,
        fieldName: 'address',
        handler: 'set data',
        missingField: false
      },
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-password-placeholder'),
        type: 'password',
        isRequired: true,
        fieldName: 'password',
        handler: 'set data',
        missingField: false
      },
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-repeat-password-placeholder'),
        type: 'password',
        isRequired: true,
        fieldName: 'confirm-password',
        handler: 'confirm pass',
        missingField: false
      },
    ];
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
    this._handlers = {};
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
      _handlers : { type : Object}
    };
  }

  static get styles () {
    return css`
      sophos-chimera-input {
        --sophos-chimera-input-main-container-height: 85px;
        --sophos-chimera-input-input-container-input-style-simple-bar-input-input-tag-height: 30px;
        --sophos-chimera-input-input-message-margin: 5px 0 10px;
        --sophos-chimera-input-input-container-input-style-simple-bar-input-margin-bottom: 40px;
      }

      #password-message-container[message-style="password-message-success"] {
        background-color: #73db46;
      }

      #password-message-container[message-style="password-message-error"] {
        background-color: #ff1e00;
      }

      #password-message-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        margin: 0 0 30px 0;
        border-radius: 20px;
        opacity: 0.8;
      }

      #password-message {
        font-size: 1rem;
        font-family: monospace;
        font-weight: bold;
      }
      
      #password-message[message="success"] {
        color: #000;
      }

      #password-message[message="error"] {
        color: #fff;
      }
    `;
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
    this._handlers = {
      'set data' : this.setUserDataField,
      'confirm pass' : this.confirmPassword
    };
    this.initData();
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
    this.inputsList =  this.inputsList.map(input => {
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
        @sophos-input-changed=${this._handlers[inputData.handler]}>
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
        this.createAccount();
      } else {
        this.cancel();
      }
    }
  }

  createAccount () {
    this.dispatchEvent(new CustomEvent('create-account', {
      detail : { userData: {...this.userData} }
    }));
  }

  cancel () {
    this.resetEmptyFields();
    this.dispatchEvent(new CustomEvent('cancel-create-account'));
  }


  setUserDataField (e) {
    this.userData[e.target.getAttribute('field-name')] = e.detail.value;
  }

  confirmPassword (e) {
    if(this.userData.password && e.detail.value === this.userData.password) {
      this._showPasswordSuccessMessage();
    } else {
      this._showPasswordErrorMessage();
    }
  }

  initData () {
    this.inputsList.map(input => {
      this.userData[input.fieldName] = ''
    });
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
      ${this.showForm()}
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