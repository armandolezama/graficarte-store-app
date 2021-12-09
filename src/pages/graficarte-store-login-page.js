import { LitElement, html, css } from 'lit-element';
import 'sophos-chimera-button/sophos-chimera-button';
import 'sophos-simple-modal/sophos-simple-modal';
import getLocal from '../locales/'

export class GraficarteStoreLoginPage extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.inputList = [];
    this._email = '';
    this._password = '';
    this.isModalOpened = false;
    this.modalTitle = '';
    this.modalMessage = '';
    this.modalFooterMessage = '';
    this.modalLabelsButtons = [
      {
      label: ''
      }, 
      {
        label: 'Cancelar'
      }
    ];
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      inputList : { type : Array },
      isModalOpened : { type : Boolean },
      modalTitle : { type : String },
      modalMessage : { type : String },
      modalFooterMessage : { type : String },
    };
  }

  static get styles () {
    return css`
      #login-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 99vh;
      }

      #login-form-container{
        background: #FFFFFF;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        width: 400px;
        height: 400px;
        border-radius: 30px;
      }
      
      sophos-chimera-input {
        --sophos-chimera-input-main-container-height: auto;
      }
    `;
  }

  createForm (){
    return this.inputList.map(inputData => {
      return html`
      
      <sophos-simple-modal
      modalStyle="full-screen"
      ?isModalOpened=${this.isModalOpened}
      .modalTitle=${this.modalTitle}
      .modalMessage=${this.modalMessage}
      .modalFooterMessage=${this.modalFooterMessage}>

        <sophos-chimera-button
        slot="modal-body"
        type="simple-multi-button"
        .buttonsLabels=${this.modalLabelsButtons}
        @sophos-chimera-button-click=${this._manageModalButtons}>
        </sophos-chimera-button>

      </sophos-simple-modal>

      <sophos-chimera-input
        field-name=${inputData.fieldName}
        .styleOfInput=${inputData.styleOfInput}
        .maxLength=${inputData.maxLength}
        .label=${inputData.label}
        .type=${inputData.type}
        .isRequired=${inputData.isRequired}
        .showMessage=${inputData.missingField}
        .emptyMessage=${this.emptyMessage}
        @sophos-input-changed=${this.setUserCredentialField}>
      </sophos-chimera-input>
      `;
    });
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
    payload.option === 0 ? this._openSubmitModal() : payload.option === 1 ? this._openCancelModal() : payload;
  }

  _manageModalButtons (e){
    const payload = e.detail.buttonDescription;
    payload.option === 0 ? payload.key === 'store' ? this._cancel() : this._submit() : this._closeModal();
  }

  _openSubmitModal (){
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

  _closeModal (){
    this.modalTitle = '';
    this.modalMessage = '';
    this.modalFooterMessage = '';
    this.modalLabelsButtons = ['', ''];
    this.isModalOpened = false;
  }

  _submit (){
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
              label: 'Entrar'
            }, 
            {
              label: 'Cancelar'
            }
            ]}
          @sophos-chimera-button-click=${this.manageLoginActions} id="login-submit">Entrar</sophos-chimera-button>
        </div>
      </div>
    `;
  }
}

customElements.define('graficarte-store-login-page', GraficarteStoreLoginPage);