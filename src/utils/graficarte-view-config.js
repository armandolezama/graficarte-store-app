export default {
  'public-store': {
    mainPage: 'public-store',
    clientContent: '',
    templateStyle: 'full-header',
    templateClass: 'public-store-container',
    isCreateAccountOptionDisplayed: true,
    isShoppingCartIconDisplayed: false,
    shownBuyingOptions: false,
  },
  'client-store': {
    mainPage: 'client-store',
    clientContent: 'home',
    templateStyle: 'full-nav',
    templateClass: 'client-store-container',
    isCreateAccountOptionDisplayed: false,
    isShoppingCartIconDisplayed: true,
    shownBuyingOptions: true,
  },
  'admin-store': {
    mainPage: 'client-store',
    clientContent: 'home',
    templateStyle: 'full-nav',
    templateClass: 'client-store-container',
    isCreateAccountOptionDisplayed: false,
    isShoppingCartIconDisplayed: true,
    shownBuyingOptions: true,
  }
}
