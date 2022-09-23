import { ServiceController } from "./controller-class/ServiceController";
import Cookies from 'js-cookie';
//https://www.npmjs.com/package/js-cookie;

export class GraficarteStoreLoginController extends ServiceController {
  //component to manage error or success response from login service

  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.userData= {};
    this.method = 'POST';
    this.url = 'public/login';
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      userData : { type : Object },
    };
  }

  willUpdate (changedProps){
    super.willUpdate(changedProps)
    const missingFields = this.getEmptyFields(this.userData);
    if (missingFields.length > 0) {
      this.dispatchEvent(new CustomEvent('missing-fields', {
        detail: {
          channelName: 'graficarte-login-missing-fields',
          payload: missingFields,
        },
      }));
    } else {
      this._login()
    }
  }

  getEmptyFields (data){
    return [
      !data.email && 'email',
      !data.password && 'password',
    ].filter(field => field);
  }

  payloadProcessor (payload){
    const token = payload.token;
    Cookies.set('client-token', token);
    super.payloadProcessor(payload);
  }

  _login (){
    
    this.body = {
      email: this.userData.email,
      password: this.userData.password
    }
    this.channelName = 'graficarte-user-data';
    this.setService();
    this.setListeners();
    this.doRequest();
    this.userData = {};
  }
}

customElements.define('graficarte-store-login-controller', GraficarteStoreLoginController);

/**
 * TO-DO: Enhance coocke management. Run security testing for this implementation and report all vulnerabilities.
 */
