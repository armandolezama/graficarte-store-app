import { LitElement, html } from 'lit';
import '../graficarte-store-main-view/graficarte-store-main-view';

export class GraficarteStoreViewController extends LitElement {
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
    };
    this.graficarteState = () => {};
    this.channels = {
      ['graficarte-user-data'] : 'userData'
    };
    this.viewSettings = {
      'login' : () => {},
      'create-accoun' : () => {},
      'client-store' : () => {},
      'public-store' : () => {},
    }
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
      inputChannels: { type: Object },
      viewConfig: { type: Object },
      userData: { type: Object },
    };
  }

  firstUpdated (){
    const { viewState } = this.graficarteState;
    this.viewSettings = {
      'login' : viewState.setLoginPage.bind(viewState),
      'create-account' : viewState.setAccountPage.bind(viewState),
      'client-store' : viewState.setClientStorePage.bind(viewState),
      'public-store' : viewState.setPublicStorePage.bind(viewState),
    };
    this.temporaryStorage = {};
    this.setPageConfig('public-store')
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

  createAccount (e) {
    this._signinData = e.detail.userData;
  }

  setProgressState () {
    console.log('this shit is in progress');
  }

  pageNavigation (e){
    const pageName = e.detail;
    this.setPageConfig(pageName);
  }

  setPageConfig (config = ''){
    this.viewSettings[config]();
    this.viewConfig = this.graficarteState.viewState.getState();    
  }

  requestUpdateOfUserData (e){
    const channelPayload = [{
      channelName: 'graficarte-updated-user-data',
      payload: e.detail,
    }];
    this.sendOutputPayload(channelPayload);
  }

  requestLogin (e){
    const channelPayload = [{
      channelName: 'graficarte-login-user',
      payload: e.detail,
    }];
    this.sendOutputPayload(channelPayload);
  }

  cancelLogin (){
    this.setPageConfig('public-store');
  }

  requestSignIn (e){
    const channelPayload = [{
      channelName: 'graficarte-signin-user',
      payload: e.detail,
    }];
    this.saveTemporaryPayload(channelPayload);
  }

  cancelSignin (){
    this.setPageConfig('public-store');
  }

  searchProductByTerm (e){
    const channelPayload = [{
      channelName: 'graficarte-search-product-by-term',
      payload: e.detail,
    }];
    this.sendOutputPayload(channelPayload); 
  }

  saveTemporaryPayload (channelPayload) {
    const suspendedRequest = {
      channelName : channelPayload.channelName,
      temporaryPayolad : channelPayload.payload,
    };
    this.temporaryStorage = [...this.temporaryStorage, suspendedRequest];
  }

  sendSavedPayload (){
    this.sendOutputPayload(this.temporaryStorage);
    this.temporaryStorage = [];
  }

  cancelTemporaryStorage (){
    this.temporaryStorage = [];
  }

  sendOutputPayload (payload = [{}]){
    console.log(payload)
    this.dispatchEvent(new CustomEvent('output-channel', {
      detail: payload
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
        @cancel-access-for-user=${this.cancelLogin}
        @request-registration-for-user=${this.requestSignIn}
        @cancel-registration-for-user=${this.cancelSignin}
        @store-search-by-term=${this.searchProductByTerm}>
      </graficarte-store-main-view>
    `;
  }
}
customElements.define('graficarte-store-view-controller', GraficarteStoreViewController);
