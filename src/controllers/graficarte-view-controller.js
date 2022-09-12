import { LitElement, html } from 'lit';
import '../graficarte-store-main-view/graficarte-store-main-view';

export class GraficarteViewController extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this.inputChannel = {
      channelName: '',
      payload: () => {},
    };
    this.channels = {
      ['graficarte-login'] : this.loginControllerData,
      ['graficarte-client-data'] : this.clientData,
    }
  }

  /**
    * Declared properties and their corresponding attributes
    */
  static get properties() {
    return {
      inputChannel: { type: Object},
    };
  }

  set inputChannel (value) {
    const currValue = {...value};
    const oldValue = {...this._inputChannel}

    this.channels[currValue.channelName] = currValue.payload

    this.requestUpdate('inputChannel', oldValue)
  }

  outputPayload(payload){
    this.dispatchEvent(new CustomEvent('output-channel', {
      detail: payload
    }));
  }

  render() {
    return html`
      <graficarte-store-main-view>
      </graficarte-store-main-view>
    `;
  }
}
customElements.define('graficarte-view-controller', GraficarteViewController);
