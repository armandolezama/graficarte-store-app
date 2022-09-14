import { LitElement, html } from 'lit';
import styles from './graficarte-store-profile-styles';
import 'sophos-card/sophos-card';
import 'sophos-chimera-input/sophos-chimera-input';
import 'sophos-chimera-button/sophos-chimera-button';
import getLocal from '../../../locales';

export class GraficarteStoreProfile extends LitElement {
    /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
     constructor () {
      super();
      this.profilePicture = './assets/client-user.png';
      this.profilePictureAlt = 'profile image';
      this.clientName = '';
      this.clientLastName = '';
      this.clientEmail = '';
      this.clientInputStyle = 'basic';
      this.clientButtonStyle = 'simple-multi-button';
      this._userData = {};
      this.clientEditButtonMessage = {
        label: getLocal('graficarte-store-client-profile-client-edit-field-button'),
        key: 'edit',
      };
      
      this.formButtonLabels = [
        {
          label: getLocal('graficarte-store-client-profile-client-save-button'),
          key: 'save',
        }
      ];
    }
  
    /**
      * Declared properties and their corresponding attributes
      */
    static get properties () {
      return {
        profilePicture : { type : String },
        profilePictureAlt : { type: String },
        clientName : { type : String},
        clientLastName : { type : String},
        clienDescription : { type : String},
        clientForm : { type : Array},
        userData : { type : Object },
      };
    }
  
    static get styles () {
      return styles;
    }

    set userData (value) {
      const currValue = value;
      const oldValue = {...this.userData};
      const orderedInputs = [
        currValue.name,
        currValue.lastName,
        currValue.phoneNumber,
        currValue.address,
      ]

      this.clientName = currValue.name;
      this.clientLastName = currValue.lastName;
      this.clientEmail = currValue.email;

      this.clientForm = this.clientForm?.map((input, index) => {
        input.value = orderedInputs[index];
        return input;
      })

      this._userData = currValue;
      this.requestUpdate('userData', {...oldValue});
    }

    get userData (){
      return this._userData;
    }

    saveData (){
      const payload = {
        name: this.clientForm[0].value,
        lastName: this.clientForm[1].value,
        phoneNumber: this.clientForm[2].value,
        address: this.clientForm[3].value,
        email: this.clientEmail,
      };
      this.dispatchEvent(new CustomEvent('graficarte-store-profile-has-changed', { detail: payload }));
    }
  
    render () {
      return html`
        <div id="main-container">
          <div id="card-container">
            <sophos-card
            .configContent=${['pickture', 'title' ,'subtitle', 'description']}
            .pictureSRC=${this.profilePicture}
            .pictureAlt=${this.profilePictureAlt}
            .cardTitle=${this.clientName}
            .subtitle=${this.clientLastName}
            .description=${this.clientEmail}>
            </sophos-card>
          </div>
          <div id="client-form-container">
            <graficarte-store-client-form>
            </graficarte-store-client-form>
            <div id="client-form-buttons-container">
              <sophos-chimera-button
              id="save-cancel-button"
              .type=${this.clientButtonStyle}
              .buttonsLabels=${this.formButtonLabels}
              @sophos-chimera-button-click=${this.saveData}></sophos-chimera-button>
            </div>
          </div>
        </div>
      `;
    }
}

customElements.define('graficarte-store-profile', GraficarteStoreProfile);
