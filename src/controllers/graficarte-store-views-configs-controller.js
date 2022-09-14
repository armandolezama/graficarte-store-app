import { LitElement } from 'lit';
import viewsConfigs from '../utils/graficarte-view-config';

export class GraficarteStoreViewsConfigsController extends LitElement {
  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor () {
    super();
    this.viewConfig = '';
  }

  static get properties () {
    return {
      viewConfig: { type: String },
    };
  }

  set viewConfig (value) {
    const currValue = value;
    const oldValue = this._viewConfig;

    const viewConfig = viewsConfigs[`${currValue}-page`]

    this.dispatchEvent(new CustomEvent('view-config-setted', {
      detail: viewConfig
    }))

    this._viewConfig = currValue
    this.requestUpdate('viewConfig', oldValue)
  }

  firstUpdated () {
    super.firstUpdated();
    this.dispatchEvent(new CustomEvent('view-config-setted', {
      detail: viewsConfigs['public-store-page']
    }))
  }
}
customElements.define('graficarte-store-views-configs-controller', GraficarteStoreViewsConfigsController);
