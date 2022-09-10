import { LitElement } from 'lit';
import GraficarteStoreAPI from '../service/graficarte-store-api';

export class GraficarteStoreSignInController extends LitElement {
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
    this.url = '/client'
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
    console.log(value)

    if(this.isCurrValueValid(currValue)){
      console.log(currValue)

      this.setService('PATCH', `${this.url}/updateUserData`)
      this.service.setRequestBody({
        ...currValue
      })
  
      this.service.addEventListener('request-is-in-progress', () => {
        this.dispatchEvent(new CustomEvent('request-in-progress'));
      });
      
      this.service.addEventListener('request-is-done', e => {
        const payload =e.detail.response;
        this.dispatchEvent(new CustomEvent('request-is-done', {
          detail: JSON.parse(payload)
        }));
      });
  
      this.service.addEventListener('request-failed', () => {
        this.dispatchEvent(new CustomEvent('request-failed'), {
          detail: {}
        });
      });
  
      this.service.doRequest();
  
      this.service = () => {}
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

  setService (method, url){
    this.service = new GraficarteStoreAPI(method, url);
  }
}

customElements.define('graficarte-store-client-controller', GraficarteStoreSignInController)
