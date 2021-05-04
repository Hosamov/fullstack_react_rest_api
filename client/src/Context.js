import React, { Component } from 'react';
import Cookies from 'js-cookie'; //import Cookies library
import Data from './Data'; //import Data helper class

export const Context = React.createContext();

export class Provider extends Component {

  state = {
    //set initial state of Provider class to values tored in 'authenticatedUser' cookie or null
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  };

  constructor() {
    super();
    this.data = new Data(); //initialize new instance of Data class
  }

  render() {
    const { authenticatedUser } = this.state; //using destructuring, extract authenticatedUser from this.state

    //value object to provide the utility methods of the Data class
    const value = {
      authenticatedUser,
      data: this.data,
      actions: { //Add the 'actions' property and object
        signIn: this.signIn,
        signOut: this.signOut
      }
    };

    /*<Context.Provider> is a higher-order component that returns a Provider component*/
    return (
      <Context.Provider value={value}> {/*value represents an object containing the context to be shared throughout the component tree*/}
        {this.props.children}
      </Context.Provider>
    );
  }

  //Async function that takes a username and password as arguments
  //Uses these credentials to call getUser() method in Data.js.
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password); //set value to await a promise returned by this.data.getUser()
    if(user !== null) {
      this.setState(() => {
        user.password = password;
        user.emailAddress = emailAddress;
        return { authenticatedUser: user };
       });
       //set Cookie
       //pass 'authenticatedUser' to cookie name, store the stringified user object,
       Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 }); // expires after 1 day
     }
    return user;
  }

  signOut = () => {
    this.setState({authenticatedUser: null}); //removes the name and username properties from state
    Cookies.remove('authenticatedUser'); //remove the cookies when the user signs out
  }

}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */
export default function withContext(Component) { //withContext() automatically subscribes (connects) the component passed into it to all actions and context changes
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}
