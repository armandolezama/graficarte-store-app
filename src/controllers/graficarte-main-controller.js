import { LitElement, html } from 'lit';
import { GraficarteStoreClientController } from './controllers/graficarte-store-client-controller';
import { GraficarteStoreSignInController } from './controllers/graficarte-store-sign-in-controller';
import { GraficarteStoreLoginController } from './controllers/graficarte-store-login-controller';

export class GraficarteMainController extends LitElement {
  
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this.inputChannel = {
      channelName: '',
      payload: {}
    };
    this.loginControllerData = {
      email: '',
      password: '',
    };
    this.clientData = {
      name: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      email: '',
    };
    this.updatedUserData = {...this.clientData};
    this.channels = {
      ['graficarte-login'] : this.loginControllerData,
      ['graficarte-client-data'] : this.clientData,
    }
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties() {
    return {
      inputChannel: { type: Object},
    };
  }

  set inputChannel (value) {
    const currValue = {...value};
    const oldValue = {...this._inputChannel}

    this.channels[currValue.channelName] = currValue.payload

    this.requestUpdate('inputChannel', oldValue)
  }

  outputPayload(payload){
    this.dispatchEvent(new CustomEvent('output-channel', {
      detail: payload
    }));
  }

  render() {
    return html`
      <graficarte-store-login-controller
        .email=${this.loginControllerData.email}
        .password=${this.loginControllerData.password}
        @request-is-done=${this.manageSucessLoginEvent}
        @request-failed=${this.manageErrorRequest} 
        @request-in-progress=${this.manageInProgressRequest}>
      </graficarte-store-login-controller>

      <graficarte-store-client-controller
      .userData=${this.clientData}
      .updatedUserData=${this.updatedUserData}
        @request-is-done=${this.manageSucessLoginEvent}
        @request-failed=${this.manageErrorRequest} 
        @request-in-progress=${this.manageInProgressRequest}>
      </graficarte-store-client-controller>

      <graficarte-store-sign-in-controller
        .name = ${this.clientData.name};
        .lastName = ${this.clientData.lastName};
        .phoneNumber = ${this.clientData.phoneNumber};
        .email = ${this.clientData.email};
        .address = ${this.clientData.address};
        .password = ${this.clientData.password};
        @request-is-done=${this.manageSucessLoginEvent}
        @request-failed=${this.manageErrorRequest} 
        @request-in-progress=${this.manageInProgressRequest}>
      </graficarte-store-sign-in-controller>
    `;
  }

}
customElements.define('graficarte-main-controller', GraficarteMainController);
