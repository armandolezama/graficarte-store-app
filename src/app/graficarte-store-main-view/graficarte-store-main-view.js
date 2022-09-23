import { LitElement, html } from 'lit';
import styles from './graficarte-store-main-view-styles';
import './pages/graficarte-store-page-router';
import '../graficarte-store-complements/graficarte-store-side-bar/graficarte-store-side-bar';
import '../graficarte-store-complements/graficarte-store-header/graficarte-store-header';
import '../graficarte-store-complements/graficarte-store-modal/graficarte-store-modal';

export class GraficarteStoreMainView extends LitElement {
  
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.mainPage = '';
    this.clientContent = '';
    this.templateStyle = '';
    this.templateClass = '';
    this.isCreateAccountOptionDisplayed = false;
    this.isShoppingCartIconDisplayed = false;
    this.shownBuyingOptions = false;
    this.modalConfig = '';
    this.userData = {};
    this.serviceMessage = {};
    this.loginMissingFields = [];
    this.signinMissingFields = [];
    this.requestErrorData = {
      error: '',
    };
  }

  /**
  * Object describing property-related metadata used by Polymer features
  */
  static get properties () {
    return {
      mainPage: { type: String },
      clientContent: { type: String },
      templateStyle: { type: String },
      templateClass: { type: String },
      isCreateAccountOptionDisplayed: { type: Boolean },
      isShoppingCartIconDisplayed: { type: Boolean },
      shownBuyingOptions: { type: Boolean },
      modalConfig: { type: String },
      loginMissingFields: { type: Array },
      signinMissingFields: { type: Array },
      requestErrorData: { type: Object },
    };
  }

  static get styles () {
    return styles;
  }

  searchTerm (e){
    const { detail } = e;
    this.dispatchEvent(new CustomEvent('store-search-by-term', {
      detail
    }))
  }

  openShoppingCartPage () {
    this.dispatchEvent(new CustomEvent('open-shopping-cart-page',{
      detail: 'shopping-cart',
    }));
  }

  headerNavigation (e){
    const { detail } = e;
    this.dispatchEvent(new CustomEvent('header-navigation', {
      detail
    }))
  }

  signIn (e){
    const { detail } = e;
    this.dispatchEvent(new CustomEvent('request-registration-for-user', {
      detail
    }))
  }

  cancelSignIn (){
    this.dispatchEvent(new CustomEvent('cancel-registration-for-user'))
  }

  login (e) {
    const { detail } = e;
    this.dispatchEvent(new CustomEvent('request-access-for-user', {
      detail
    }))
  }

  cancelLogin () {
    this.dispatchEvent(new CustomEvent('cancel-access-for-user'))
  }

  continuerequest (){
    this.dispatchEvent(new CustomEvent('continue-request'))
  }

  cancelRequest (){
    this.dispatchEvent(new CustomEvent('cancel-request'))
  }

  closeModal (){
    this.dispatchEvent(new CustomEvent('close-modal'))
  }

  acceptError (){
    this.dispatchEvent(new CustomEvent('accept-error'))
  }

  setValidCreateAccountPassword () {
    this.isValidCreateAccountPassword = true;
  }

  setInvalidCreateAccountPassword () {
    this.isValidCreateAccountPassword = false;
  }

  addProductToCart (e){
    console.log('im adding to cart this product:');
    console.log(e.detail.productDescription);
  }

  buyProduct (e){
    console.log('im buying this product:');
    console.log(e.detail.productDescription);
  }

  updateUserData (e){
    const { detail } = e;
    this.dispatchEvent(new CustomEvent('request-update-of-user-data', { 
      detail
    }))
  }

  render () {
    return html`
        <sophos-simple-template
          id="app-main-template"
          .page-name=${this.mainPage}
          .styleTemplate=${this.templateStyle}
          .class=${this.templateClass}>
          <div slot="header-content">
            <graficarte-store-header
            .content=${this.mainPage}
            ?isCreateAccountEnable=${this.isCreateAccountOptionDisplayed}
            ?isShoppingCartIconEnable=${this.isShoppingCartIconDisplayed}
            @searching-for-term=${this.searchTerm}
            @open-shopping-cart-page=${this.openShoppingCartPage}
            @header-page-change=${this.headerNavigation}>
            </graficarte-store-header>
          </div>
          <div slot="main-view-content">
            <graficarte-store-page-router
              .userData=${this.userData}
              .mainPage =${this.mainPage}
              .clientPage=${this.clientContent}
              .templateStyle=${this.templateStyle}
              .templateClass=${this.templateClass}
              .shownBuyingOptions=${this.shownBuyingOptions}
              .loginMissingFields=${this.loginMissingFields}
              .signinMissingFields=${this.signinMissingFields}
              .requestErrorData=${this.requestErrorData}
              @create-account=${this.createAccount}
              @cancel-create-account=${this.cancelCreateAccount}
              @request-registration-for-user=${this.signIn}
              @cancel-registration-for-user=${this.cancelSignIn}
              @request-access-for-user=${this.login}
              @cancel-access-for-user=${this.cancelLogin}
              @valid-password=${this.setValidCreateAccountPassword}
              @invalid-password=${this.setInvalidCreateAccountPassword}
              @add-product-to-cart=${this.addProductToCart}
              @buy-product=${this.buyProduct}
              @update-user-data=${this.updateUserData}
              @accept-error=${this.acceptError}>
            </graficarte-store-page-router>
          </div>
          <div slot="nav-bar-content">
            <graficarte-store-side-bar
              .name=${this.userData?.name}
              .lastName=${this.userData?.lastName}
              @graficarte-navigate-to-page=${this.clientNavigation}
              @finish-sesion=${this.openLogoutModal}>
            </graficarte-store-side-bar>
          </div>
        </sophos-simple-template>

        <graficarte-store-modal
        .configCommand=${this.modalConfig}
        .serviceMessage=${this.serviceMessage}
        @graficarte-continue-request=${this.continuerequest}
        @graficarte-cancel-request=${this.cancelRequest}
        @graficarte-close-modal=${this.closeModal}
        >
        </graficarte-store-modal>
    `;
  }
}
customElements.define('graficarte-store-main-view', GraficarteStoreMainView);
