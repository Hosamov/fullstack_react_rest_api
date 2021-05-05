//Stateful Component
import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // used for linking to /signup route
import Form from './Form';

export default class UserSignIn extends Component {

  //set state
  state = {
    emailAddress: '', //emailAddress = 'username'
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
    const { context } = this.props; //destructuring to extract context from props
    const { emailAddress, password } = this.state; //Unpack properties from state into distinct variables, makes submit handler cleaner and easier to understand
    const { from } = this.props.location.state || { from: { pathname: '/courses' } };

      context.actions.signIn(emailAddress, password)

        .then((user) => {
          if(user === null) {
            this.setState(() => {
              return { errors: ['log-in unsuccessful.'] };
            })
          } else {
            this.props.history.push(from) //navigate user to home/courses route
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
