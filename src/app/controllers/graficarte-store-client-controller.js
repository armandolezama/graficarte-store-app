import { ServiceController } from "./controller-class/ServiceController";

export class GraficarteStoreClientController extends ServiceController {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.userData = {};
    this.updatedUserData = {};
    this.newOrderData = {};
    this.updatedOrderData = {};
    this.canceledOrderData = {};
    this.baseURL = '/client'
  }

  static get properties () {
    return {
      updatedUserData: { type: Object },
    };
  }
  
  /**
   * @param {any} value
   */
  set updatedUserData (value) {
    const currValue = {...value};

    if(this.isCurrValueValid(currValue)){
      this.body = {...currValue};
      this.url = `${this.baseURL}/updateUserData`
      this.setService();
      this.setListeners();
      this.doRequest;
    }
    this._updatedUserData = currValue;
    
  }

  get updatedUserData (){
    return this._updatedUserData;
  }

  isCurrValueValid (currValue){
    let shouldUpdate = false;

    for(const property in currValue){
      if(this.userData[property] !== currValue[property]) {
        shouldUpdate = true;
        break;
      }
    }
    return shouldUpdate;
  }
}

customElements.define('graficarte-store-client-controller', GraficarteStoreClientController)
