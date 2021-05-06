/*
* UpdateCourse Component
* Stateful component
* Private Route, renders input elements for updating the current selected course
*/
import React, { Component } from 'react';
import Form from './Form';

const url = "http://localhost:5000/api"; //url for REST API

export default class UpdateCourse extends Component {
  state = {
    title: '',
    author: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId: null,
    errors: [],
  }

  componentDidMount() {
    const id = this.props.match.params.id; //target the id param
    console.log(id);

    //use Fetch API to get course data needed to update
    fetch(`${url}/courses/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const courseData = data.course[0];
        if(courseData !== undefined) { //check if there is courseData to update
          this.setState({
            //set state of fetched data
            title: courseData.title,
            author: courseData.author,
            description: courseData.description,
            estimatedTime: courseData.estimatedTime,
            materialsNeeded: courseData.materialsNeeded,
            userId: courseData.userId,
          })
        } else { //if there is no courseData, redirect user to /notfound path
          this.props.history.push('/notfound');
        }
      })
      .catch(error => {
        console.log('Error fetching and parsing data from database ', error);
      })
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
          submitButtonText="Update Course"
          elements={() => (
            <React.Fragment>
              <h2>Update Course</h2>
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
    const {emailAddress, password} = context.authenticatedUser; // extract needed user auth data to pass into context.data.createCourse
    const userId = context.authenticatedUser.id; //id of the authenticateduser

    const id = this.props.match.params.id; //target the :id param

    const { //unpack properties from state object to use during form submit
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    const course = { // Combine properties from state to pass into context.data.updateCourse()
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };

      context.data.updateCourse(id, course, emailAddress, password)
        .then(errors => {
          if(errors.length) {
            this.setState({ errors });
          } else {
            console.log(`Course successfully updated: ${course.title}`);
            this.props.history.push('/') //navigate user to home/courses route
          }
        })
      .catch(err => {
        //handle errors
        console.log({err});
        if(err.status === 403) { // unauthorized
          this.props.history.push('/forbidden');
        } else {
          console.log(err);
          this.props.history.push('/error');
        }
      })
  }
}
