import { LitElement, html } from 'lit';
import styles from './graficarte-create-account-form-styles';
import getLocal from '../../../../../utils/locales';

export class GraficarteCreateAccountForm extends LitElement {

  constructor (){
    super();
    this.inputsList = [
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-name-placeholder'),
        type: 'text',
        isRequired: true,
        fieldName: 'name',
        handler: 'set-data',
        missingField: false
      },
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-last-name-placeholder'),
        type: 'text',
        isRequired: true,
        fieldName: 'lastName',
        handler: 'set-data',
        missingField: false
      },
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-phone-number-placeholder'),
        type: 'text',
        isRequired: true,
        fieldName: 'phoneNumber',
        handler: 'set-data',
        missingField: false
      },
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-email-placeholder'),
        type: 'email',
        isRequired: true,
        fieldName: 'email',
        handler: 'set-data',
        missingField: false
      },
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-address-placeholder'),
        type: 'text',
        isRequired: true,
        fieldName: 'address',
        handler: 'set-data',
        missingField: false
      },
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-password-placeholder'),
        type: 'password',
        isRequired: true,
        fieldName: 'password',
        handler: 'set-data',
        missingField: false
      },
      {
        styleOfInput: 'simple-bar-input',
        maxLength : 30,
        label: getLocal('graficarte-store-create-account-form-repeat-password-placeholder'),
        type: 'password',
        isRequired: true,
        fieldName: 'confirm-password',
        handler: 'confirm-pass',
        missingField: false
      },
    ];
    this.createAccountActionsHandlers = {};
  }

  static get styles () {
    return styles;
  }

  firstUpdated (){
    super.firstUpdated();

    this.createAccountActionsHandlers = {
      'set-data' : this.setUserDataField,
      'confirm-pass' : this.confirmPassword
    };
  }

  setUserDataField (e) {
    this.userData[e.target.getAttribute('field-name')] = e.detail.value;
  }

  confirmPassword (e) {
    if(this.userData.password && e.detail.value === this.userData.password) {
      this.isPasswordValid = true;
      this._showPasswordSuccessMessage();
    } else {
      this.isPasswordValid = false;
      this._showPasswordErrorMessage();
    }
  }

  render () {
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
}
customElements.define('graficarte-create-account-form', GraficarteCreateAccountForm);
