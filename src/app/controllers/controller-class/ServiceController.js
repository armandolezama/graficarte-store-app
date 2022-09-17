import { LitElement } from 'lit';
import GraficarteStoreAPI from '../../../libs/service/graficarte-store-api';

export class ServiceController extends LitElement {

  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.method = '';
    this.url = '';
    this.body = {};
    this.service = () => {} //GraficarteStoreAPI type
  }

  setService (url = this.url, method = this.method, body = this.body){
    this.service = new GraficarteStoreAPI(method, url);
    this.service.setRequestBody(body);
    this.setListeners();
  }

  setListeners (){
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
  }

  doRequest (){
    this.service.doRequest();
  
    this.service = () => {};
  }
}
