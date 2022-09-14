import { LitElement, html } from 'lit';
import '../controllers/graficarte-store-client-controller';
import '../controllers/graficarte-store-sign-in-controller'
import '../controllers/graficarte-store-login-controller'
import '../controllers/graficarte-store-views-configs-controller';

export class GraficarteStoreMainController extends LitElement {
  
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.inputChannel = {
      channelName: '',
      //Payload: Standard to declare variable objects
      payload: () => {},
    };
    this.loginControllerData = {
      email: '',
      password: '',
    };
    this.signinControllerData = {
      name: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      email: '',
      password: '',
    }
    this.clientData = {
      name: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      email: '',
    };
    this.updatedUserData = {...this.clientData};
    this.viewConfig = '';
    this.channels = {
      ['graficarte-login-user'] : this.loginControllerData,
      ['graficarte-client-data'] : this.clientData,
      ['graficarte-updated-user-data'] : this.updatedUserData,
      ['graficarte-signin-user'] : this.signinControllerData,
      ['graficarte-view-config'] : this.viewConfig,
    }
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      inputChannel: { type: Object},
    };
  }

  willUpdate(changedProps){
    super.updated(changedProps);
    if(changedProps.has('inputChannel')){
      const relatedProp = this.channels[this.inputChannel.channelName];
      this[relatedProp] = {...this.inputChannel.payload}
    }
  }

  sendViewConfig (e){
    const payload = e.detail;
    const channelName = 'graficarte-view-config';
    this.sendOutputPayload(channelName, payload);
  }

  manageSucessRequest (e){
    const payload = e.detail;
    const channelName = 'request-success';
    this.sendOutputPayload(channelName, payload)
  }

  manageErrorRequest (e){
    const payload = e.detail;
    const channelName = 'request-error'
    this.sendOutputPayload(channelName, payload)
  }
  
  manageInProgressRequest (e){
    const payload = e.detail;
    const channelName = 'request-in-progress';
    this.sendOutputPayload(channelName, payload)
  }

  sendOutputPayload (channelName, payload = {}){
    this.dispatchEvent(new CustomEvent('output-channel', {
      detail: {
        channelName,
        payload
      }
    }));
  }

  render () {
    return html`
      <graficarte-store-login-controller
        .email=${this.loginControllerData.email}
        .password=${this.loginControllerData.password}
        @request-is-done=${this.manageSucessRequest}
        @request-failed=${this.manageErrorRequest} 
        @request-in-progress=${this.manageInProgressRequest}>
      </graficarte-store-login-controller>

      <graficarte-store-client-controller
      .userData=${this.clientData}
      .updatedUserData=${this.updatedUserData}
        @request-is-done=${this.manageSucessRequest}
        @request-failed=${this.manageErrorRequest} 
        @request-in-progress=${this.manageInProgressRequest}>
      </graficarte-store-client-controller>

      <graficarte-store-sign-in-controller
        .name = ${this.signinControllerData.name}
        .lastName = ${this.signinControllerData.lastName}
        .phoneNumber = ${this.signinControllerData.phoneNumber}
        .email = ${this.signinControllerData.email}
        .address = ${this.signinControllerData.address}
        .password = ${this.signinControllerData.password}
        @request-is-done=${this.manageSucessRequest}
        @request-failed=${this.manageErrorRequest} 
        @request-in-progress=${this.manageInProgressRequest}>
      </graficarte-store-sign-in-controller>

      <graficarte-store-views-configs-controller
      .viewConfig=${this.viewConfig}
      @view-config-setted=${this.sendViewConfig}>
      </graficarte-store-views-configs-controller>
    `;
  }

}
customElements.define('graficarte-store-main-controller', GraficarteStoreMainController);
