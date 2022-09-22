export default class GraficarteClientState {
  constructor (){
    this.name = '';
    this.lastName = '';
    this.email = '';
    this.address = '';
    this.phoneNumber= '';
    this.paymentMethods = {};
    this.userConfigurations = {};
    this.comments = []
  }

  setClientData (clientData){
    this.name = clientData.name;
    this.lastName = clientData.lastName;
    this.email = clientData.email;
    this.address = clientData.address;
    this.phoneNumber = clientData.phoneNumber;
  }

  setPaymentMethods(methods){
    this.paymentMethods = methods;
  }

  setClientUserConfigurations(userConfigurations){
    this.userConfigurations = userConfigurations;
  }

  saveComent(comment){
    this.comments = [...this.comments, comment];
  }

  getClientState (){
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
