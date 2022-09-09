import { LitElement, html, css } from 'lit';
import 'sophos-card/sophos-card';
import 'sophos-chimera-input/sophos-chimera-input';
import 'sophos-chimera-button/sophos-chimera-button';
import getLocal from '../locales';

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
      this.clientName = 'John Doe';
      this.clientSurname = 'Doe Doe';
      this.clientDescription = 'Usuario desde hace rato';
      this.clientInputStyle = 'basic';
      this.clientButtonStyle = 'simple-multi-button';
      this.userData = {};
      this.clientEditButtonMessage = {
        label: getLocal('graficarte-store-client-profile-client-edit-field-button'),
        key: 'edit',
      };
      this.clientForm = [
        {
          label: getLocal('graficarte-store-client-profile-client-name'),
          fieldName: 'client-name',
          type: 'text',
          isDisabled: true,
          value: '',
        },
        {
          label: getLocal('graficarte-store-client-profile-client-surname'),
          fieldName: 'client-surname',
          type: 'text',
          isDisabled: true,
          value: '',
        },
        {
          label: getLocal('graficarte-store-client-profile-client-phone-number'),
          fieldName: 'client-phone-number',
          type: 'text',
          isDisabled: true,
          value: '',
        },
        {
          label: getLocal('graficarte-store-client-profile-client-email'),
          fieldName: 'client-email',
          type: 'text',
          isDisabled: true,
          value: '',
        },
        {
          label: getLocal('graficarte-store-client-profile-client-address'),
          fieldName: 'client-address',
          type: 'text',
          isDisabled: true,
          value: '',
        },
      ];
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
        clientSurname : { type : String},
        clienDescription : { type : String},
        clientForm : { type : Array},
        userData : { type : Object },
      };
    }
  
    static get styles () {
      return css`

        .input-form-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: row;
          width: 350px;
        }

        .input-form-button {
          display: flex;
          position: relative;
          right: 0;
          bottom: -9px;
        }

        #card-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        #client-form-buttons-container {
          margin-top: 60px;
        }

        #save-cancel-button {
          --sophos-chimera-button-simple-single-buttons-simple-multi-button-margin-bottom: 0;
          --sophos-chimera-button-height: 35px;
        }

        sophos-card {
          --sophos-card-host-width: 100%;
          --sophos-card-host-max-width: 200px;
          --sophos-card-host-min-width: 100px;
          --sophos-card-main-container-cursor: pointer;
        }

        .form-input {
          --sophos-chimera-input-main-container-height : auto;
          --sophos-chimera-input-main-container-height: 80px;
        }
        
        .form-button {
          --sophos-chimera-button-height: 20px;
          margin-top: 45px;
        }
      `;
    }

    set userData (value) {
      const currValue = value;
      const oldValue = this.userData;
      const orderedInputs = [
        currValue.name,
        currValue.lastName,
        currValue.phoneNumber,
        currValue.email,
        currValue.address,
      ]

      this.clientForm = this.clientForm?.map((input, index) => {
        input.value = orderedInputs[index];
        return input
      })

      this._userData = currValue;
      this.requestUpdate('userData', oldValue);
    }

    editField (e){
      const field = e.target.getAttribute('field-name');
      const editableField = this.clientForm.find(input => input.fieldName === field);
      editableField.isDisabled = false;
      this.requestUpdate();
    }

    _manageSaveCancelOptions (e){
      const { option } = e.detail;
      if (option === 0) {
        this.saveData();
      }
    }

    saveData (){
      this.dispatchEvent(new CustomEvent('graficarte-store-profile-has-changed'));
    }

    createClientForm (){
      return this.clientForm.map(inputForm => html`
      <div class="input-form-container">
        <sophos-chimera-input
          class="form-input"
          field-name=${inputForm.fieldName}
          maxLength="20"
          .styleOfInput=${this.clientInputStyle}
          .label=${inputForm.label}
          .type=${inputForm.type}
          .value=${inputForm.value}
          ?isDisabled=${inputForm.isDisabled}>
        </sophos-chimera-input>
        <div class="input-form-button">
          <sophos-chimera-button
            class="form-button"
            field-name=${inputForm.fieldName}
            .type=${this.clientButtonStyle}
            .buttonsLabels=${[this.clientEditButtonMessage]}
            @sophos-chimera-button-click=${this.editField}>
          </sophos-chimera-button>
        </div>
      </div>
    `)
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
            .subtitle=${this.clientSurname}
            .description=${this.clientDescription}>
            </sophos-card>
          </div>
          <div id="client-form-container">
            ${this.createClientForm()}
            <div id="client-form-buttons-container">
              <sophos-chimera-button
              id="save-cancel-button"
              .type=${this.clientButtonStyle}
              .buttonsLabels=${this.formButtonLabels}></sophos-chimera-button>
            </div>
          </div>
        </div>
      `;
    }
}

customElements.define('graficarte-store-profile', GraficarteStoreProfile);
