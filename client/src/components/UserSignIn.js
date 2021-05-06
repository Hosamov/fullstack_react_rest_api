/*
* UserSignIn Component
* Stateful component
* Renders input elements for creating a new authorized use to the app.
*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // used for linking to /signup route
import Form from './Form';

export default class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props; //extract context from props in order to get data from the global state
    const { emailAddress, password } = this.state; // extract needed user data to pass into context.actions.signIn.
    const { from } = this.props.location.state || { from: { pathname: '/courses' } }; //redirect user back to previous screen after successful login

      context.actions.signIn(emailAddress, password)

        .then((user) => {
          if(user === null) {
            this.setState(() => {
              return { errors: ['log-in unsuccessful.'] };
            })
          } else {
            this.props.history.push(from) //navigate user to previous screen
            console.log(`SUCCESS! ${emailAddress} is now signed in!`)
          }
        })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      })
  }

  cancel = () => {
    this.props.history.push('/'); //redirect to home route
  }

  render() {
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="form--centered">

         <Form
           cancel={this.cancel}
           errors={errors}
           submit={this.submit}
           submitButtonText="Sign In"
           elements={() => (
             <React.Fragment>
               <h2>Sign In</h2>
               <label htmlFor="emailAddress">Email Address</label>
               <input
                 id="emailAddress"
                 name="emailAddress"
                 type="text"
                 value={emailAddress}
                 onChange={this.change} />
               <label htmlFor="password">Password</label>
               <input
                 id="password"
                 name="password"
                 type="password"
                 value={password}
                 onChange={this.change}
                 label="Password" />
             </React.Fragment>
           )} />
         <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
      </div>
    );
  }
}
