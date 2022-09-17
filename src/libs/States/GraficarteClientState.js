export default class GraficarteClientState {
  constructor(){
    this.name = '';
    this.lastName = '';
    this.email = '';
    this.address = '';
    this.phoneNumber= '';
    this.paymmentMethods = {};
    this.userConfigurations = {};
    this.comments = []
  }

  getClientState(){
    const {
      name, 
      lastName, 
      email, 
      address, 
      phoneNumber, 
      paymmentMethods, 
      userConfigurations,
      comments,
    } = this;
    return {
      name, 
      lastName, 
      email, 
      address, 
      phoneNumber, 
      paymmentMethods, 
      userConfigurations,
      comments,
    };
  }
}