import { css } from 'lit-element';

export default css`
  #main-app-container{
    display: block;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    background: linear-gradient(180deg, rgba(114,212,80,1) 0%, rgba(16,161,19,1) 38%, rgba(20,152,63,1) 74%, rgba(59,251,152,1) 100%);
  }

  #create-account-container {
    --sophos-simple-template-main-container-template-style-full-header-width: 100%;
    --sophos-simple-template-main-view-template-style-full-header-width: 100%;
    --sophos-simple-template-nav-bar-display: none;
  }

  #public-store-container {
    --sophos-simple-template-main-container-template-style-full-header-width: auto;
    --sophos-simple-template-main-view-template-style-full-header-width: auto;
    --sophos-simple-template-nav-bar-display: none;
  }

  #admin-inventory-container {
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