/*
//Create Course
//Stateful component
//Private Route
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
    const authUser = this.props.context.authenticatedUser;
    const author = `${authUser.firstName} ${authUser.lastName}`;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;

    //TODO: use markdown formatted text for materialsNeeded and description properties

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
    const { context } = this.props; //extract context from props
    const {emailAddress, password, id} = context.authenticatedUser;
    const userId = id;

    //Unpack properties from state into distinct variables, makes submit handler cleaner and easier to understand
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state;

    //new course payload
    const course = { // to be passed to createCourse() method
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };

      context.data.createCourse(course, emailAddress, password)
        .then(errors => {
          if(errors.length) {
            this.setState({ errors });
          } else {
            console.log(`New course: ${course.title} was created.`);
            this.props.history.push('/') //navigate user to home/courses route
          }
        })
      .catch(err => {
        if(err === 401) {
          this.props.history.push('/forbidden');
        } else if (err === 404) {
          this.props.history.push('/notfound');
        } else {
          console.log(err);
          this.props.history.push('/error');
        }
      })
  }
}
