import { LitElement, html } from 'lit';
import styles from './graficarte-store-modal-styles';

export class GraficarteStoreModal extends LitElement {
  
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.isModalOpened = false;
    this.modalTitle = '';
    this.modalMessage = '';
    this.modalFooterMessage = '';
    this.modalLabelsButtons = [
      {
        label: '',
        key: '',
      }
    ];
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      isModalOpened: { type: Boolean },
      modalTitle: { type: String },
      modalMessage: { type: String },
      modalFooterMessage: { type: String },
    };
  }

  static get styles () {
    return styles;
  }

  openModal () {
    this.isModalOpened = true;
  }

  closeModal () {
    this.isModalOpened = false;
  }

  manageModalOptions (e) {
    const option = e.detail.buttonDescription.key;
    if (option === 'close-modal') {
      this.closeModal();
    } else if (option === 'back-to-login') {
      this.closeModal();
    } else if(option === 'close-api-error-modal'){
      this._loginData = {};
      this.closeModal();
    } else {
      this.showPublicStore();
      this.closeModal();
    }
  }

  setApiServerErrorModal () {
    this.modalTitle = 'Error en el servidor';
    this.modalMessage = 'Algo ha fallado con el servidor, por favor, inténtelo más tarde.';
    this.modalLabelsButtons = [
      {
        label: 'Continuar',
        key: 'close-api-error-modal',
      }
    ];
    this.modalFooterMessage = 'Graficarte';
    this.openModal();
  }

  setLogoutModal () {
    this.modalTitle = '¿Desea salir de la sesión?';
    this.modalMessage = 'Presione "Continuar si desea quedarse, o presione "Salir" para terminar su sesión"';
    this.modalLabelsButtons = [
      {
        label: 'Continuar',
        key: 'close-modal',
      },
      {
        label: 'Salir',
        key: 'close-session',
      },
    ];
    this.modalFooterMessage = 'Graficarte';
  }

  setLoginErrorModal (error) {

    this.modalTitle = `${error.info}`;
    this.modalMessage = `${error.message}`;
    this.modalLabelsButtons = [
      {
        label: 'Aceptar',
        key: 'close-modal',
      },
    ];
    this.modalFooterMessage = 'Graficarte';
  }

  setSigninErrorModal (error) {

    this.modalTitle = `${error.info}`;
    this.modalMessage = `${error.message}`;
    this.modalLabelsButtons = [
      {
        label: 'Aceptar',
        key: 'close-modal',
      },
    ];
    this.modalFooterMessage = 'Graficarte';
  }

  render () {
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
            @sophos-chimera-button-click=${this.manageModalOptions}>
          </sophos-chimera-button>
      
        </sophos-simple-modal>
    `;
  }
}
customElements.define('graficarte-store-modal', GraficarteStoreModal);
