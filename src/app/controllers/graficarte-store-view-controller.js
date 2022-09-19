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
    this.modalConfig = '';
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
      modalConfig: { type: String },
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
    this.temporaryStorage = [];
    this.inputChannels = [];
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
  }

  cancelLogin (){
    this.nextPageAfterModal = 'public-store';
    this.modalConfig = 'exit-from-login'
  }

  requestSignIn (e){
    const channelPayload = [{
      channelName: 'graficarte-signin-user',
      payload: e.detail,
    }];
    this.saveTemporaryPayload(channelPayload);
    this.modalConfig = 'request-for-signin';
  }

  cancelSignin (){
    this.nextPageAfterModal = 'public-store';
    this.modalConfig = 'exit-from-signin';
  }

  searchProductByTerm (e){
    const channelPayload = [{
      channelName: 'graficarte-search-product-by-term',
      payload: e.detail,
    }];
    this.sendOutputPayload(channelPayload); 
  }

  continueRequest (){
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

  sendOutputPayload (payload = [{}]){
    this.dispatchEvent(new CustomEvent('output-channel', {
      detail: payload
    }));
  }

  saveTemporaryPayload (channelPayload) {
    const suspendedRequest = {
      channelName : channelPayload[0].channelName,
      payload : channelPayload[0].payload,
    };
    this.temporaryStorage = [...this.temporaryStorage, suspendedRequest];
  }

  sendSavedPayload (){
    this.sendOutputPayload(this.temporaryStorage);
    this.temporaryStorage = [];
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
        >
      </graficarte-store-main-view>
    `;
  }
}
customElements.define('graficarte-store-view-controller', GraficarteStoreViewController);
