import { css } from 'lit-element';

export default css`
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