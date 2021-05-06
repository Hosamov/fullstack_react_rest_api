/*
* Create Course
* Stateful component
* Private Route, renders input elements for adding a new course to the app
*/
import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: []
  }

  render() {
    const authUser = this.props.context.authenticatedUser; //use context to locate authenticatedUser
    const author = `${authUser.firstName} ${authUser.lastName}`;
    const { //unpack properties from state object to use during render
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;

    return(
      <div className="wrap">
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Create Course"
          elements={() => (
            <React.Fragment>
              <h2>Create Course</h2>
              <div className="main--flex">
                <div>
                  <label htmlFor="courseTitle">Course Title</label>
                  <input
                    id="courseTitle"
                    name="title"
                    type="text"
                    value={title}
                    onChange={this.change} />
                  <label htmlFor="courseAuthor">Course Author</label>
                  <input
                    id="courseAuthor"
                    name="author"
                    type="text"
                    onChange={this.change}
                    placeholder={author}
                    disabled />
                  <label htmlFor="courseDescription">Course Description</label>
                  <textarea
                    id="courseDescription"
                    name="description"
                    type="text"
                    value={description}
                    onChange={this.change} />
                </div>
                <div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    value={estimatedTime}
                    onChange={this.change} />
                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    type="text"
                    value={materialsNeeded}
                    onChange={this.change} />
                </div>
              </div>
            </React.Fragment>
        )} />
      </div>
    )
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

  submit = () => {
    const { context } = this.props; //extract context from props in order to get data from the global state
    const {emailAddress, password, id} = context.authenticatedUser; // extract needed user data to pass into context.data.createCourse
    const userId = id;

    const { //unpack properties from state object to use during form submit
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state;

    // Combine properties from state to pass into context.data.createCourse()
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };

      // Create a new course within the database
      context.data.createCourse(course, emailAddress, password)
        .then(errors => {
          if(errors.length) {
            this.setState({ errors });
          } else {
            console.log(`New course successfully created: ${title}`);
            this.props.history.push('/') //navigate user to home (/) route
          }
        })
      .catch(err => {
        //handle errors
        if(err === 401) { //unauthorized
          this.props.history.push('/forbidden');
        } else if (err === 404) { //page not found
          this.props.history.push('/notfound');
        } else {
          console.log(err);
          this.props.history.push('/error');
        }
      })
  }
}
