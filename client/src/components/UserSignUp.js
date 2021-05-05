//Stateful Component
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
    const { context } = this.props; //destructuring to extract context from props

    //Unpack properties from state into distinct variables, makes submit handler cleaner and easier to understand
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmedPassword
    } = this.state;

    //new user payload
    const user = { //new user payload to be passed to the createUser() method
      firstName,
      lastName,
      emailAddress,
      password,
      confirmedPassword
    };

    //Ensure password and confirmPassword are the same before creating the user
    if(password === confirmedPassword) {
      //create new user
      context.data.createUser(user) //return a promise
        .then( errors => {
          if (errors.length) { //check if returned promise is an array of errors.
            this.setState({ errors }); //set state to the array of errors
          } else {
            console.log(`${emailAddress} is successfully signed up and authenticated!`); //log out that user has successfully been authenticated

            context.actions.signIn(emailAddress, password)
              .then((user) => {
                if(user === null) {
                  this.setState(() => {
                    return { errors: ['Login unsuccessful']};
                  })
                } else {
                  this.props.history.push('/') //navigate user to home/courses route
                }
              })
          }
        })
        .catch ((err) => { //handle rejected promises
          console.log(err);
          this.props.history.push('/error'); //push to history stack
        })
    } else {
      //let user know passwords must match
      this.setState(() => {
        return { errors: ["Passwords don't match."]};
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
