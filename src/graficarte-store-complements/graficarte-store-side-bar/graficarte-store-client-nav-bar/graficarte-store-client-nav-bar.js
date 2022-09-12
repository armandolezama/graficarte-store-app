import { LitElement, html } from 'lit';
import styles from './graficarte-store-client-nav-bar-styles';
import 'sophos-icon/sophos-icon';
import 'sophos-chimera-button/sophos-chimera-button';
import getLocal from '../locales';

export class GraficarteStoreClientNavBar extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.name = '';
    this.lastName = '';
    this.clientOptions = [
      {
        label: getLocal('graficarte-store-client-nav-bar-options-client-store'),
        key: 'home'
      },
      {
        label: getLocal('graficarte-store-client-nav-bar-options-my-shopping'),
        key: 'shopping-history'
      },
      {
        label: getLocal('graficarte-store-client-nav-bar-options-payment-methods'),
        key: 'payment-methods'
      },
      {
        label: getLocal('graficarte-store-client-nav-bar-options-profile'),
        key: 'profile'
      },
      {
        label: getLocal('graficarte-store-client-nav-bar-options-notifications'),
        key: 'notifications'
      },
      {
        label: getLocal('graficarte-store-client-nav-bar-options-configuration'),
        key: 'profile-config'
      }
    ];
    this.finishSesionLabel = [
      {
        label: getLocal('graficarte-store-client-nav-bar-options-end-session')
      }
    ];
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties () {
    return {
      clientOptions : { type : Array},
      finishSesionLabel : { type : Array}
    };
  }

  static get styles () {
    return styles;
  }

  get fullUserName () {
    return `${this.name} ${this.lastName}`
  }

  navigate (e){
    const page = e.detail.buttonDescription.key;
    this.dispatchEvent(new CustomEvent('graficarte-navigate-to-page', { detail: {
      page
    }}));
  }

  finishSesion () {
    this.dispatchEvent(new CustomEvent('finish-sesion'))
  }

  render () {
    return html`
      <div id="client-nav-bar-container">
        <sophos-icon
        .imageSource=${'./assets/client-user.png'}
        .imageAlt=${'client-pickture'}
        .iconText=${this.fullUserName}
        .iconDirection=${'top'}>
        </sophos-icon>
        <div>
          <sophos-chimera-button
          id="client-options-multi-button"
          type="simple-multi-button"
          .buttonsLabels=${this.clientOptions}
          @sophos-chimera-button-click=${this.navigate}>
          </sophos-chimera-button>
        </div>
        <sophos-chimera-button
        type="simple-multi-button"
        .buttonsLabels=${this.finishSesionLabel}
        @sophos-chimera-button-click=${this.finishSesion}>
      </sophos-chimera-button>
      </div>
    
    `;
  }
}

customElements.define('graficarte-store-client-nav-bar', GraficarteStoreClientNavBar);
