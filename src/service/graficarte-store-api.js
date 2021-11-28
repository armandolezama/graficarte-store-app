/**
 * TO-DO: add fetch module and validation
 */

import envCongif from '../../env-config';
export default class GraficarteStoreAPI extends HTMLElement {
  //Class to manage login service
  constructor(method, url){
    super();
    this.requestBody = () => {};
    this.method = method;
    this.url = `${envCongif.GRAFICARTE_API}/${url}`;
    this.request = () => {};
    this.response = () => {};
    this.buildRequest();
  };

  async doRequest(){
    try {
      await this.request.send(JSON.stringify(this.requestBody));
    } catch (error) {
      this.serviceFailEvent();
    };
  };

  buildRequest(){
    this.request = new XMLHttpRequest();
    this.request.open(this.method, this.url);
    this.request.setRequestHeader("Accept", "application/json");
    this.request.setRequestHeader('Content-Type', 'application/json');
    this.setOnProgressMethod(this.request, () =>{
      this.dispatchEvent(new CustomEvent('request-is-in-progress'));
    });

    this.setOnLoadMethod(this.request, () => {
      const response = this.request.response;
      this.dispatchEvent(new CustomEvent('request-is-done', { detail: {
        response
      }}));
    });

    this.setOnErrorMethod(this.request, () => {
      this.serviceFailEvent();
    });
  };

  serviceFailEvent(){
    this.dispatchEvent(new CustomEvent('request-failed'))
  };

  setOnProgressMethod(requestObject, method){
    requestObject.onprogress = method;
  };

  setOnLoadMethod(requestObject, method){
    requestObject.onload = method;
  };

  setOnErrorMethod(requestObject, method){
    requestObject.onerror = method;
  };

  setRequestBody(requestBody){
    this.requestBody = requestBody;
  };
};

customElements.define('graficarte-store-api', GraficarteStoreAPI);