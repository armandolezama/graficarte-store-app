import { LitElement, html } from 'lit-element';
import styles from './graficarte-store-app-styles';
import './pages/graficarte-store-home-page';
export class GraficarteStoreApp extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
  }

  /**
    * Object describing property-related metadata used by Polymer features
    */
  static get properties() {
    return {
    };
  }

  static get styles() {
    return styles;
  };

  render() {
    return html`
      <div id="main-app-container">
        <graficarte-store-home-page></graficarte-store-home-page>
      </div>
    `;
  }
}
customElements.define('graficarte-store-app', GraficarteStoreApp);