import { LitElement } from 'lit';
import GraficarteStoreAPI from '../service/graficarte-store-api';

export class GraficarteStoreLoginController extends LitElement {
  //component to manage error or success response from login service

  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.email = '';
    this.password = '';
    this.method = 'POST';
    this.url = 'public/login';
    this.setService();
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      email : { type : String},
      password : { type : String}
    };
  }

  updated (changedProps) {
    super.updated( changedProps );
    const emptyFields = this.getEmptyFields();

    if(emptyFields.length === 0){
      this._login();
    } else {
      this.missingFieldsMessage(emptyFields);
    }
  }

  getEmptyFields (){
    return [
      !this.email && 'email',
      !this.password && 'password'
    ].filter(field => field);
  }

  _login (){
    
    this.service.setRequestBody({
      email: this.email,
      password: this.password
    });
    
    this.service.addEventListener('request-is-in-progress', () => {
      this.dispatchEvent(new CustomEvent('request-in-progress'));
    });
    
    this.service.addEventListener('request-is-done', e => {
      const payload =e.detail.response;
      this.dispatchEvent(new CustomEvent('request-is-done', {
        detail: { payload }
      }));
      this.setService();
    });

    this.service.addEventListener('request-failed', () => {
      this.dispatchEvent(new CustomEvent('request-failed'));
      this.setService();
    });
    
    this.service.doRequest();
  
  }

  missingFieldsMessage (emptyFields){
    this.dispatchEvent(new CustomEvent('missing-fields', {
      detail: {
        emptyFields
      }
    }));
  }

  setService (method = this.method, url = this.url){
    this.service = new GraficarteStoreAPI(method, url);
  }
}

customElements.define('graficarte-store-login-controller', GraficarteStoreLoginController);