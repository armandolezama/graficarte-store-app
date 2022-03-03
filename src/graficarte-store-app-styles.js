import { css } from 'lit';

export default css`
  #main-app-container{
    display: block;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    background: linear-gradient(90deg, rgba(145,255,59,1) 0%, rgba(0,80,249,1) 100%);
  }

  #app-main-template {
    --sophos-simple-template-main-container-template-style-full-header-height: 98.4vh;
  }

  .create-account-container {
    --sophos-simple-template-main-container-template-style-full-header-width: 100%;
    --sophos-simple-template-main-view-template-style-full-header-width: 100%;
    --sophos-simple-template-nav-bar-display: none;
    --sophos-simple-template-main-view-container-overflow: visible;
    --sophos-simple-template-main-view-container-overflow-y: none;
    --sophos-simple-template-header-height: 90px;
  }

  .public-store-container {
    --sophos-simple-template-main-container-template-style-full-header-width: auto;
    --sophos-simple-template-main-view-template-style-full-header-width: auto;
    --sophos-simple-template-nav-bar-display: none;
  }

  .login-store-container {
    --sophos-simple-template-nav-bar-display: none;
    --sophos-simple-template-main-view-template-style-full-header-width: 100%;
  }

  .admin-inventory-container {
    --sophos-simple-template-main-view-template-style-full-nav-height: 100%;
    --sophos-simple-template-header-display: none;
  }

  graficarte-store-header {
    width: 100%;
  }

  sophos-simple-template{
    max-width: 1700px;
    --sophos-simple-template-main-view-template-style-full-header-border-style: none;
    --sophos-simple-template-main-view-template-style-full-nav-border-style: none;
    --sophos-simple-template-main-section-template-style-full-header-border-style: none;
    --sophos-simple-template-main-section-template-style-full-nav-border-style: none;
    --sophos-simple-template-nav-bar-border-style: none;
    --sophos-simple-template-header-border-style: none;
    --sophos-simple-template-main-container-template-style-full-header-border-style: none;
    --sophos-simple-template-main-container-template-style-full-nav-border-style: none;
  }
`;
