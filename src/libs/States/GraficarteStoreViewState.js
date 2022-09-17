export default class GraficarteStoreViewState {
  constructor (){
    this.mainPage = '';
    this.clientContent = '';
    this.templateStyle = '';
    this.templateClass = '';
    this.isCreateAccountOptionDisplayed = false;
    this.isShoppingCartIconDisplayed = false;
    this.shownBuyingOptions = false;
  }

  setPublicStorePage (){
    this.mainPage = 'public-store';
    this.clientContent = '';
    this.templateStyle = 'full-header';
    this.templateClass = 'public-store-container';
    this.isCreateAccountOptionDisplayed = true;
    this.isShoppingCartIconDisplayed = false;
    this.shownBuyingOptions = false;
  }

  setClientStorePage (){
    this.mainPage = 'client-store';
    this.clientContent = 'home';
    this.templateStyle = 'full-nav';
    this.templateClass = 'client-store-container';
    this.isCreateAccountOptionDisplayed = false;
    this.isShoppingCartIconDisplayed = true;
    this.shownBuyingOptions = true;
  }

  setAdminStorePage (){
    //TO-DO Refactor this data
    this.mainPage = 'admin-store';
    this.clientContent = 'home';
    this.templateStyle = 'full-nav';
    this.templateClass = 'client-store-container';
    this.isCreateAccountOptionDisplayed = false;
    this.isShoppingCartIconDisplayed = true;
    this.shownBuyingOptions = true;
  }

  setAccountPage (){
    this.mainPage = 'create-account';
    this.clientContent = '';
    this.templateStyle = 'full-header';
    this.templateClass = 'create-account-container';
    this.isCreateAccountOptionDisplayed = false;
    this.isShoppingCartIconDisplayed = false;
    this.shownBuyingOptions = false;
  }

  setLoginPage (){
    this.mainPage = 'login';
    this.clientContent = '';
    this.templateStyle = 'full-header';
    this.templateClass = 'login-store-container';
    this.isCreateAccountOptionDisplayed = false;
    this.isShoppingCartIconDisplayed = false;
    this.shownBuyingOptions = false;
  }

  setShoppingCartPage (){
    this.mainPage = 'client-store';
    this.clientContent = 'shopping-cart';
    this.templateStyle = 'full-header';
    this.templateClass = 'create-account-container';
    this.isCreateAccountOptionDisplayed = false;
    this.isShoppingCartIconDisplayed = false;
    this.shownBuyingOptions = false;
  }

  getState (){
    const {
    mainPage,
    clientContent,
    templateStyle,
    templateClass,
    isCreateAccountOptionDisplayed,
    isShoppingCartIconDisplayed,
    shownBuyingOptions,
    } = this;
    return {
      mainPage,
      clientContent,
      templateStyle,
      templateClass,
      isCreateAccountOptionDisplayed,
      isShoppingCartIconDisplayed,
      shownBuyingOptions,
      };
  }
}
