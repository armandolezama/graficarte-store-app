import { LitElement, html } from 'lit';
import styles from './graficarte-store-app-styles';
import 'sophos-simple-template/sophos-simple-template';
import 'sophos-simple-modal/sophos-simple-modal';
import './controllers/graficarte-main-controller';
import './controllers/graficarte-view-controller';

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

  static get styles () {
    return styles;
  }

  setMainControllerOutput(e){
    const payload = e.detail;
    this.viewControllerInput = payload;
  }

  setViewControllerOutput(e){
    const payload = e.detail;
    this.mainControllerInput = payload;
  }

  render () {
    return html`
      <div id="main-app-contain.0321er0">

        <graficarte-store-main-controller
        .innputChannel=${this.mainControllerInput}
        @output-channel=${this.setMainControllerOutput}>
        </graficarte-store-main-controller>

        <graficarte-view-controller
        .inputChannel=${this.viewControllerInput}
        @output-channel=${this.setViewControllerOutput}>
        </graficarte-view-controller>

        <graficarte-store-modal>
        </graficarte-store-modal>
      
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
