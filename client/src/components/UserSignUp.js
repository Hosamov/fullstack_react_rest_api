/*
* UserSignUp Component
* Stateful component
* Renders input elements for logging into the app
*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // used for linking to /signin route
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmedPassword: '',
    errors: []
  }

  submit = () => {
    const { context } = this.props; //extract context from props in order to get data from the global state

    const { //unpack properties from state object to use during form submit
      firstName,
      lastName,
      emailAddress,
      password,
      confirmedPassword
    } = this.state;

    const user = { // Combine properties from state to pass into context.data.createUser()
      firstName,
      lastName,
      emailAddress,
      password,
      confirmedPassword
    };

    //Ensure password and confirmPassword are the same before proceeding to creating the new user
    if(password === confirmedPassword) { //ensure passwords match
      //create new user
      context.data.createUser(user)
        .then( errors => {
          if (errors.length) { //check if returned promise is an array of errors.
              this.setState({ errors }); // set state to the array of errors
          } else {
            console.log(`${emailAddress} is successfully signed up and authenticated!`); //log out that user has successfully been authenticated

            context.actions.signIn(emailAddress, password)
              .then((user) => {
                if(user === null) {
                  this.setState(() => {
                    return { errors: ["User unable to login"]}
                  })
                } else {
                  this.props.history.push('/') //navigate user to home/courses route
                }
              })
          }
        })
        .catch ((err) => { //handle rejected promises
          console.log(err);
          this.props.history.push('/error');
        })
    } else {
      //let user know passwords must match
      this.setState(() => {
        return { errors: ["Both password fields must match."] };
      })
    }

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

  cancel = () => {
    this.props.history.push('/'); //redirect user back to home route
  }

  render() {
      const {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmedPassword,
        errors
      } = this.state;

    return (
      <div className="form--centered">
        <h2>Sign Up</h2>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Sign Up"
          elements={() => (
            <React.Fragment>
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={firstName}
                onChange={this.change} />
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={lastName}
                onChange={this.change} />
              <label htmlFor="emailAddress">Email Address</label>
              <input
                id="emailAddress"
                name="emailAddress"
                type="email"
                value={emailAddress}
                onChange={this.change} />
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={this.change} />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmedPassword"
                type="password"
                value={confirmedPassword}
                onChange={this.change} />
            </React.Fragment>
          )} />
        <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
    </div>
    )
  }
}
