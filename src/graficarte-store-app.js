import { LitElement, html } from 'lit-element';
import styles from './graficarte-store-app-styles';
import './pages/graficarte-store-home-page';
import 'sophos-simple-template/sophos-simple-template';
import productMocks from './products-mocks';
export class GraficarteStoreApp extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this.productMocks = productMocks;
  }

  /**
    * Object describing property-related metadata used by Polymer features
    */
  static get properties() {
    return {
      productMocks : { type : Array }
    };
  }

  static get styles() {
    return styles;
  };

  render() {
    return html`
      <div id="main-app-container">
        <sophos-simple-template>
            <graficarte-store-home-page .products="${this.productMocks}" slot="main-view-content"></graficarte-store-home-page>
        </sophos-simple-template>
      </div>
    `;
  }
}
customElements.define('graficarte-store-app', GraficarteStoreApp);