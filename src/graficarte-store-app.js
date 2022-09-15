import { LitElement, html } from 'lit';
import styles from './graficarte-store-app-styles';
import './controllers/graficarte-store-main-controller';
import './controllers/graficarte-store-view-controller';

export class GraficarteStoreApp extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.viewControllerInput = {
      channelName: '',
      payload: () => {},
    }
    this.mainControllerInput = {
      channelName: '',
      payload: () => {},
    }
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      viewControllerInput: { type: Object},
      mainControllerInput: { type: Object},
    };
  }

  static get styles () {
    return styles;
  }

  setMainControllerOutput (e){
    const payload = e.detail;
    this.viewControllerInput = payload;
  }

  setViewControllerOutput (e){
    const payload = e.detail;
    this.mainControllerInput = payload;
  }

  render () {
    return html`
      <div id="main-app-container">

        <graficarte-store-main-controller
        .inputChannel=${this.mainControllerInput}
        @output-channel=${this.setMainControllerOutput}>
        </graficarte-store-main-controller>

        <graficarte-store-view-controller
        .inputChannel=${this.viewControllerInput}
        @output-channel=${this.setViewControllerOutput}>
        </graficarte-store-view-controller>
      
      </div>
    `;
  }
}

customElements.define('graficarte-store-app', GraficarteStoreApp);

/**
 * TO-DO: Add session management system 
 * (caché, local session, token) for aplication
 */

/**
 * TO-DO: Add recovery password feature 
 */

/**
 * TO-GO: Add change password feature
 */

/**
 * TO-DO: Add buy product feature
 */

/**
 * TO-GO: Add reset password feature
 */

/**
 * TO-DO: Add models implementation for iterative instances inside controlers e.g. 
 * product controllers, product views, client controllers, client views, and so on.
 */
