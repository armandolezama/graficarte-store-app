import { LitElement, html } from 'lit';
import './graficarte-store-client-controller';
import './graficarte-store-sign-in-controller'
import './graficarte-store-login-controller';

export class GraficarteStoreMainController extends LitElement {
  
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.inputChannels = [{
      channelName: '',
      //Payload: Standard to declare variable objects
      payload: () => {},
    }];
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
    this.graficarteState = () => {};
    this.channels = {
      ['graficarte-login-user'] : 'loginControllerData',
      ['graficarte-client-data'] : 'clientData',
      ['graficarte-updated-user-data'] : 'updatedUserData',
      ['graficarte-signin-user'] : 'signinControllerData',
    };
    this.temporaryStorage = [{
      channelName: '',
      temporaryPayolad: {},
    }];
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      inputChannels: { type: Object},
    };
  }

  willUpdate (changedProps){
    super.willUpdate(changedProps);
    if(changedProps.has('inputChannels')){
      for(const channelInfo of this.inputChannels){
        const relatedProp = this.channels[channelInfo.channelName];
        this[relatedProp] = channelInfo.payload;
      }
    }
  }

  manageSucessRequest (e){
    const channelPayload = [
      {
        channelName: 'request-success',
        payload: e.detail
      }
    ]
    this.sendOutputPayload(channelPayload)
  }

  manageLoginSuccess (e){
    const channelPayload = [
      {
        channelName: 'graficarte-user-data', 
        payload: e.detail.payload.data.registry,
      }
    ];
    this.sendOutputPayload(channelPayload);
  }

  manageErrorRequest (e){
    const channelPayload = [
      {
        channelName: 'request-error',
        payload: e.detail
      }
    ]
    this.sendOutputPayload(channelPayload)
  }
  
  manageInProgressRequest (){
    this.sendOutputPayload({
      channelName: 'request-in-progress',
      payload: () => {}
    })
  }

  sendOutputPayload (payload = [{}]){
    this.dispatchEvent(new CustomEvent('output-channel', {
      detail: payload
    }));
  }

  render () {
    return html`
      <graficarte-store-login-controller
        .userData=${this.loginControllerData}
        @request-is-done=${this.manageLoginSuccess}
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
    `;
  }

}
customElements.define('graficarte-store-main-controller', GraficarteStoreMainController);
