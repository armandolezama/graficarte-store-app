import { LitElement, html } from 'lit';
import '../graficarte-store-main-view/graficarte-store-main-view';

export class GraficarteViewController extends LitElement {
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
    this.userData = {
      name: '',
      lastName: '',
      address: '',
      email: '',
      phoneNumber: '',
      id: '',
    };
    this.viewConfig = {
      mainPage: '',
      clientContent: '',
      templateStyle: '',
      templateClass: '',
      isCreateAccountOptionDisplayed: false,
      isShoppingCartIconDisplayed: false,
      shownBuyingOptions: false,
    }
    this.channels = {
      ['graficarte-user-data'] : 'userData',
      ['graficarte-view-config'] : 'viewConfig',
    }
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      inputChannel: { type: Object },
      viewConfig: { type: Object },
      userData: { type: Object },
    };
  }

  willUpdate(changedProps){
    super.updated(changedProps);
    if(changedProps.has('inputChannel')){
      const relatedProp = this.channels[this.inputChannel.channelName];
      this[relatedProp] = {...this.inputChannel.payload}
    }
  }

  createAccount (e) {
    this._signinData = e.detail.userData;
  }

  cancelCreateAccount () {
    this._signinData = {};
    this.showPublicStore();
  }

  successLogin (userData) {
    this.userData = { ...userData };
  }

  successSignin (userData) {
    this.userData = { ...userData };
  }

  successUpdatingClientData (e){
    this.userData = {...this.userData, ...e.detail.userData};
  }

  setProgressState () {
    console.log('this shit is in progress');
  }

  pageNavigation (e){
    const payload = e.detail;
    const channelName = 'graficarte-view-config';
    this.sendOutputPayload(channelName, payload);
  }

  requestUpdateOfUserData (e){
    const payload = e.detail;
    const channelName = 'graficarte-updated-user-data';
    this.sendOutputPayload(channelName, payload);
  }

  requestLogin (e){
    const payload = e.detail;
    const channelName = 'graficarte-login-user';
    this.sendOutputPayload(channelName, payload);
  }

  requestSignIn (e){
    const payload = e.detail;
    const channelName = 'graficarte-signin-user';
    this.sendOutputPayload(channelName, payload);
  }

  sendOutputPayload (channelName, payload = {}){
    this.dispatchEvent(new CustomEvent('output-channel', {
      detail: {
        channelName,
        payload,
      }
    }));
  }

  render () {
    return html`
      <graficarte-store-main-view
        .mainPage = ${this.viewConfig.mainPage}
        .clientContent = ${this.viewConfig.clientContent}
        .templateStyle = ${this.viewConfig.templateStyle}
        .templateClass = ${this.viewConfig.templateClass}
        .isCreateAccountOptionDisplayed = ${this.viewConfig.isCreateAccountOptionDisplayed}
        .isShoppingCartIconDisplayed = ${this.viewConfig.isShoppingCartIconDisplayed}
        .shownBuyingOptions = ${this.viewConfig.shownBuyingOptions}
        @header-navigation=${this.pageNavigation}
        @open-shopping-cart-page=${this.pageNavigation}
        @request-update-of-user-data=${this.requestUpdateOfUserData}
        @request-access-for-user=${this.requestLogin}
        @request-registration-for-user=${this.requestSignIn}>
      </graficarte-store-main-view>
    `;
  }
}
customElements.define('graficarte-view-controller', GraficarteViewController);
