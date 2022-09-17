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
      'request-for-login' : this.openLoginModal,
      'request-for-signin' : this.openSigninModal,
      // 'request-for-client-update' : this,
      'cancel-request' : this.closeModal,
    };
    this.configCommand = '';
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

  willUpdate (changedProps){
    super.willUpdate(changedProps);
    if(changedProps.has('configCommand')){
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

  openLoginModal (){
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

  openSigninModal (){
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

  openCancelModal (){
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
