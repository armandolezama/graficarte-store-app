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
    this.requestErrorData = {
      error: '',
    };
    this.requestInProgress = {};
    this.loginMissingFields = [];
    this.signinMissingFields = [];
    this.showMissingfields = false;
    this.modalConfig = '';
    this.graficarteState = () => {};
    this.channels = {
      'graficarte-user-data' : 'userData',
      'graficarte-login-missing-fields' : 'loginMissingFields',
      'graficarte-signin-missing-fields' : 'signinMissingFields',
      'graficarte-request-error' : 'requestErrorData',
      'graficarte-request-in-progress' : 'requestInProgress',
    };
    this.viewSettings = {
      'login' : () => {},
      'create-accoun' : () => {},
      'client-store' : () => {},
      'public-store' : () => {},
      'error-page' : () => {},
    }
    this.temporaryStorage = [{
      channelName: '',
      payload: {},
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
      requestErrorData: { type: Object },
      requestInProgress: { type: Object },
      modalConfig: { type: String },
      loginMissingFields: { type: Array },
      signinMissingFields: { type: Array },
    };
  }

  set userData (value) {
    const currValue = value;
    const oldValue = this._userData;

    this.showMissingfields = false;

    if(this.graficarteState?.clientState){

      this.graficarteState.clientState.setClientData(currValue);
  
      this.setPageConfig('client-store');
    }

    this._userData = currValue;
    this.requestUpdate('userData', oldValue);
  }

  get userData () {
    return this._userData;
  }

  set loginMissingFields (value){
    const currValue = value;
    const oldValue = this._loginMissingFields;

    if(this.showMissingfields) {
      this._loginMissingFields = currValue;
    } else {
      this._loginMissingFields = [];
    }

    this.requestUpdate('loginMissingFields', oldValue);
  }

  get loginMissingFields (){
    return this._loginMissingFields;
  }

  set requestErrorData (value){
    const currValue = value;
    const oldValue = this._requestErrorData;

    if(value.error){
      this.setPageConfig('error-page');
    }

    this._requestErrorData = currValue;
    this.requestUpdate('requestErrorData', oldValue);
  }

  get requestErrorData (){
    return this._requestErrorData;
  }

  set signinMissingFields (value){
    const currValue = value;
    const oldValue = this._signinMissingFields;

    if(this.showMissingfields) {
      this._signinMissingFields = currValue;
    } else {
      this._signinMissingFields = [];
    }

    this.requestUpdate('signinMissingFields', oldValue);
  }

  get signinMissingFields (){
    return this._signinMissingFields;
  }

  firstUpdated (){
    const { viewState } = this.graficarteState;
    this.viewSettings = {
      'login' : viewState.setLoginPage.bind(viewState),
      'create-account' : viewState.setAccountPage.bind(viewState),
      'client-store' : viewState.setClientStorePage.bind(viewState),
      'public-store' : viewState.setPublicStorePage.bind(viewState),
      'error-page' : viewState.setErrorPage.bind(viewState),
    };
    this.temporaryStorage = [];
    this.inputChannels = [];
    this.setPageConfig('public-store');
  }

  willUpdate (changedProps){
    super.willUpdate(changedProps);
    if(changedProps.has('inputChannels') && this.inputChannels.length > 0){
      for(const channelInfo of this.inputChannels){
        const relatedProp = this.channels[channelInfo.channelName];
        this[relatedProp] = channelInfo.payload;
      }
    }
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
    this.saveTemporaryPayload(channelPayload);
    this.modalConfig = 'request-for-login';
    this.showMissingfields = true;
  }

  cancelLogin (){
    this.nextPageAfterModal = 'public-store';
    this.modalConfig = 'exit-from-login';
    this.showMissingfields = false;
    this.loginMissingFields = [];
  }

  requestSignIn (e){
    const channelPayload = [{
      channelName: 'graficarte-signin-user',
      payload: e.detail,
    }];
    this.saveTemporaryPayload(channelPayload);
    this.modalConfig = 'request-for-signin';
    this.showMissingfields = true;
  }

  cancelSignin (){
    this.nextPageAfterModal = 'public-store';
    this.modalConfig = 'exit-from-signin';
    this.showMissingfields = false;
    this.signinMissingFields = [];
  }

  searchProductByTerm (e){
    const channelPayload = [{
      channelName: 'graficarte-search-product-by-term',
      payload: e.detail,
    }];
    this.sendOutputPayload(channelPayload); 
  }

  continueRequest (){
    this.closeModal();
    this.sendOutputPayload(this.temporaryStorage);
  }

  closeModal (){
    this.modalConfig = 'close-modal';
  }

  cancelRequest (){
    this.modalConfig = 'close-modal';
    if(this.nextPageAfterModal){
      this.setPageConfig(this.nextPageAfterModal);
      this.nextPageAfterModal = '';
    }
  }

  acceptError (){
    this.setPageConfig('public-store');
  }

  sendOutputPayload (payload = [{}]){
    this.dispatchEvent(new CustomEvent('output-channel', {
      detail: payload
    }));
  }

  saveTemporaryPayload (channelPayload) {
    this.temporaryStorage = [...this.temporaryStorage, ...channelPayload];
  }

  sendSavedPayload (){
    this.sendOutputPayload(this.temporaryStorage);
    this.cleanTemporaryStorage();
  }

  cleanTemporaryStorage (){
    this.temporaryStorage = [];
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
        .modalConfig=${this.modalConfig}
        .loginMissingFields=${this.loginMissingFields}
        .signinMissingFields=${this.signinMissingFields}
        .requestErrorData=${this.requestErrorData}
        @header-navigation=${this.pageNavigation}
        @store-search-by-term=${this.searchProductByTerm}
        @open-shopping-cart-page=${this.pageNavigation}
        @request-update-of-user-data=${this.requestUpdateOfUserData}
        @request-access-for-user=${this.requestLogin}
        @cancel-access-for-user=${this.cancelLogin}
        @request-registration-for-user=${this.requestSignIn}
        @cancel-registration-for-user=${this.cancelSignin}
        @continue-request=${this.continueRequest}
        @cancel-request=${this.cancelRequest}
        @close-modal=${this.closeModal}
        @accept-error=${this.acceptError}
        >
      </graficarte-store-main-view>
    `;
  }
}
customElements.define('graficarte-store-view-controller', GraficarteStoreViewController);
