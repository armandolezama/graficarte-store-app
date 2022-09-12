import { css } from "lit";

export default css`
#search-bar {
  background-color: black;
  height: 130px;
  width: 70vw;
  display: flex;
  margin: 20px;
  padding: 0 20px;
  border-radius: 30px;
}

#input-container[show-create-account-button] {
  align-items: center;
  width: 80%;
  display: flex;
}

#input-container {
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}

#search-bar-input {
padding: 20px;
margin: 20px;
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

#session-manager-container {
  display: inline-flex;
  justify-content: space-around;
  width: 20%;
  flex-direction: column;
}

sophos-chimera-button {
  --sophos-chimera-button-font-size: .8rem;
  --sophos-chimera-button-height: 30px;
  --sophos-chimera-button-simple-single-buttons-simple-multi-button-margin: 0 0 12px;
  --sophos-chimera-button-flex-direction: column;
  --sophos-chimera-button-flex-flow: column;
}

#shopping-cart-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

sophos-icon {
  margin: 5px;
  box-sizing: border-box;
  --sophos-icon-icon-image-margin: 15px 5px 5px 5px;
  --sophos-icon-icon-image-border-radius: 50%;
  --sophos-icon-icon-image-box-sizing: border-box;
  --sophos-icon-icon-text-margin: 5px 0 5px 0;
}

sophos-icon:hover {
  --sophos-icon-icon-image-border: 2px solid;
  --sophos-icon-icon-image-border-radius: 50%;
  --sophos-icon-icon-text-margin: 5px 0 5px 0;
  --sophos-icon-icon-text-color: #000000;
}

sophos-icon:active {
  border: 2px dotted;
  border-radius: 10px;
}
`;