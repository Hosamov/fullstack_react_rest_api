//Stateful Component
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      name,
      username,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div class="form--centered">

          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <div class="form--centered">
                    <h2>Sign Up</h2>

                    <form>
                        <label for="firstName">First Name</label>
                        <input id="firstName" name="firstName" type="text" value="" />
                        <label for="lastName">Last Name</label>
                        <input id="lastName" name="lastName" type="text" value="" />
                        <label for="emailAddress">Email Address</label>
                        <input id="emailAddress" name="emailAddress" type="email" value="" />
                        <label for="password">Password</label>
                        <input id="password" name="password" type="password" value="" />
                        <label for="confirmPassword">Confirm Password</label>
                        <input id="confirmPassword" name="confirmPassword" type="password" value="" />
                        <button class="button" type="submit">Sign Up</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                    </form>
                    <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={this.change}
                  placeholder="Name" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={this.change}
                  placeholder="User Name" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
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
    const { context } = this.props; //destructuring to extract context from props

    const { //destructuring to extract context from state.
      name,
      username,
      password,
    } = this.state; //Unpack name, username, and password properties from state into distinct variables
                    //Makes submit handler cleaner and easier to understand

    //new user payload
    const user = { //new user payload to be passed to the createUser() method
      name,
      username,
      password,
    };

    //create new user
    context.data.createUser(user) //createUser() is asynchronous, returns a promise.
      .then( errors => { //check if returned PromiseValue is an array of errors.
        if (errors.length) {
          this.setState({ errors });
        } else {
          context.actions.signIn(username, password)
          //console.log(`${username} is successfully signed up and authenticated!`);
            .then(() => {
              this.props.history.push('/authenticated'); //navigate user to authenticated route
            })
        }
      })
      .catch ((err) => { //handle rejected promises
        console.log(err);
        this.props.history.push('/error'); //push to history stack
      })
  }

  cancel = () => {
    this.props.history.push('/'); //redirect user back to home route
  }
}
