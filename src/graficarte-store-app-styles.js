import { css } from 'lit-element';

export default css`
  #main-app-container{
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: linear-gradient(180deg, rgba(114,212,80,1) 0%, rgba(16,161,19,1) 38%, rgba(20,152,63,1) 74%, rgba(59,251,152,1) 100%);
  }

  #public-store-container {
    --sophos-simple-template-main-container-template-style-full-header-width: auto;
    --sophos-simple-template-main-view-template-style-full-header-width: auto;
    --sophos-simple-template-nav-bar-display: none;
  }

  sophos-simple-template{
    max-width: 1700px;
    /* --sophos-simple-template-main-view-template-style-full-header-border-style: none;
    --sophos-simple-template-main-view-template-style-full-nav-border-style: none;
    --sophos-simple-template-main-section-template-style-full-header-border-style: none;
    --sophos-simple-template-main-section-template-style-full-nav-border-style: none;
    --sophos-simple-template-nav-bar-border-style: none;
    --sophos-simple-template-header-border-style: none;
    --sophos-simple-template-main-container-template-style-full-header-border-style: none; */
  }

  #search-bar {
    display: flex;
    flex-grow: 4;
    margin: 20px;
  }

  #search-bar-input {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  background-image: url('assets/search-icon.png');
  background-position: 10px 10px; 
  background-repeat: no-repeat;
  background-size: 20px 20px;
  padding: 12px 20px 12px 40px;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
}
`;