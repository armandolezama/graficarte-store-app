import { LitElement, html } from 'lit';
import styles from './graficarte-store-modal-styles';
import 'sophos-simple-modal/sophos-simple-modal'

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
    this.modalConfig = {
      'request-for-login' : this.openLoginModal.bind(this),
      'exit-from-login' : this.openCancelModal.bind(this),
      'exit-from-signin' : this.openCancelModal.bind(this),
      'request-for-signin' : this.openSigninModal.bind(this),
      'request-for-client-update' : this.openUpdateUserDataModal.bind(this),
      'cancel-request' : this.closeModal.bind(this),
      'close-modal' : this.closeModal.bind(this),
    };
    this.configCommand = '';
    this.serviceMessage = {
      info: '',
      message: '',
    };
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
      configCommand: { type: String },
    };
  }

  static get styles () {
    return styles;
  }

  willUpdate (changedProps){
    super.willUpdate(changedProps);
    if(changedProps.has('configCommand') && this.configCommand !== ''){
      this.modalConfig[this.configCommand]();
    }
  }

  closeModal (){
    this.modalTitle = '';
    this.modalMessage = '';
    this.modalFooterMessage = '';
    this.modalLabelsButtons = ['', ''];
    this.isModalOpened = false;
  }

  setApiServerErrorModal () {
    this.modalTitle = 'Error en el servidor';
    this.modalMessage = 'Algo ha fallado con el servidor, por favor, inténtelo más tarde.';
    this.modalLabelsButtons = [
      {
        label: 'Continuar',
        key: 'close-modal',
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
        label: 'Continuar en la tienda',
        key: 'close-modal',
      },
      {
        label: 'Terminar sesion',
        key: 'continue-request',
      },
    ];
    this.modalFooterMessage = 'Graficarte';
  }

  openLoginModal (){
    this.modalTitle = 'Ingresar';
    this.modalMessage = '¿Desea continuar?';
    this.modalFooterMessage = "Graficarte";
    this.isModalOpened = true;
    this.modalLabelsButtons = [
      {
        label: 'Entrar',
        key: 'continue-request'
      }, 
      {
        label: 'Volver',
        key: 'cancel-request'
      }];
  }

  openSigninModal (){
    this.modalTitle = 'Ingresar';
    this.modalMessage = '¿Desea continuar?';
    this.modalFooterMessage = "Graficarte";
    this.isModalOpened = true;
    this.modalLabelsButtons = [
      {
        label: 'Entrar',
        key: 'continue-request'
      }, 
      {
        label: 'Volver',
        key: 'cancel-request'
      }];
  }

  openUpdateUserDataModal () {
    this.modalTitle = 'Actualizar perfil';
    this.modalMessage = 'Se van a actualizar sus datos ¿Desea continuar?';
    this.modalFooterMessage = "Graficarte";
    this.isModalOpened = true;
    this.modalLabelsButtons = [
      {
        label: 'Entrar',
        key: 'continue-request'
      }, 
      {
        label: 'Volver',
        key: 'cancel-request'
      }];
  }

  openCancelModal (){
    this.modalTitle = 'Salir';
    this.modalMessage = '¿Desea regresar a la tienda?';
    this.modalFooterMessage = 'Graficarte';
    this.isModalOpened = true;
    this.modalLabelsButtons = [
      {
        label: 'Salir',
        key: 'cancel-request',
      }, 
      {
        label: 'Quedarse',
        key: 'close-modal',
      }];
  }

  setLoginErrorModal () {

    this.modalTitle = `${this.serviceMessage.info}`;
    this.modalMessage = `${this.serviceMessage.message}`;
    this.modalLabelsButtons = [
      {
        label: 'Aceptar',
        key: 'close-modal',
      },
    ];
    this.modalFooterMessage = 'Graficarte';
  }

  setSigninErrorModal () {

    this.modalTitle = `${this.serviceMessage.info}`;
    this.modalMessage = `${this.serviceMessage.message}`;
    this.modalLabelsButtons = [
      {
        label: 'Aceptar',
        key: 'close-modal',
      },
    ];
    this.modalFooterMessage = 'Graficarte';
  }

  manageModalOptions (e) {
    const option = e.detail.buttonDescription.key;
    this.dispatchEvent(new CustomEvent(`graficarte-${option}`));
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
