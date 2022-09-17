import { LitElement, html, css } from 'lit';
import 'sophos-card/sophos-card';

export class GraficarteStoreShoppingHistory extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      notificationsTable : { type : Array }
    };
  }

  static get styles () {
    return css`
      sophos-card {
        margin: 20px;
        --sophos-card-main-container-display: flex;
        --sophos-card-main-container-flex-direction: row;
        --sophos-card-host-height: 150px;
        --sophos-card-host-width: 600px;
        --sophos-card-picture-width: 200px;
        --sophos-card-picture-container-width: 200px;
        --sophos-card-main-container-justify-content: space-between;
        --sophos-card-picture-border-radius: 5px;
        --sophos-card-picture-height: 100px;
      }
    `;
  }

  render () {
    return html`
    <sophos-card
    .configContent=${['pickture', 'title' ,'subtitle', 'description']}
    .cardTitle=${'Product 1'}
    .pictureSRC=${'./assets/paint-art.jpg'}
    .pictureAlt=${'non available'}
    .subtitle=${'$50.00'}
    .description=${'buyed yesterday'}>
    </sophos-card>

    <sophos-card
    .configContent=${['pickture', 'title' ,'subtitle', 'description']}
    .cardTitle=${'Product 1'}
    .pictureSRC=${'./assets/paint-art.jpg'}
    .pictureAlt=${'non available'}
    .subtitle=${'$50.00'}
    .description=${'buyed yesterday'}>
    </sophos-card>

    <sophos-card
    .configContent=${['pickture', 'title' ,'subtitle', 'description']}
    .cardTitle=${'Product 1'}
    .pictureSRC=${'./assets/paint-art.jpg'}
    .pictureAlt=${'non available'}
    .subtitle=${'$50.00'}
    .description=${'buyed yesterday'}>
    </sophos-card>
    `;
  }
}

customElements.define('graficarte-store-shopping-history', GraficarteStoreShoppingHistory);
