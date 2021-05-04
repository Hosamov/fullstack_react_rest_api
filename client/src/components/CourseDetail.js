//Stateful Component
import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'; //used for basic markdown while rendering the data

const url = "http://localhost:5000/api"; //url for REST API

export default class CourseDetail extends Component {
  state = {
    course: '',
    author: '',
    // firstName: '',
    // lastName: '',
    // emailAddress: '',
    // estimatedTime: '',
    // materialsNeeded: '',
    errors: [],
  }

  //retrieve course components when components are mounted
  componentDidMount() {
    const id = this.props.match.params.id; //target the id param
    console.log(id);

    //use Fetch API to get course data to update
    fetch(`${url}/courses/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const courseData = data.course[0];
        const userData = data.course[0].User;
        //console.log(data.course[0])
        //console.log(data.course[0].User.firstName)
        this.setState({
          course: courseData,
          author: userData,
          // firstName: courseData.Users.firstName,
          // lastName: courseData.Users.lastName,
          // estimatedTime: courseData.estimatedTime,
          // materialsNeeded: courseData.materialsNeeded
        })
        //console.log(this.state.course.id)
        //console.log(this.state.course.User.firstName)
      })
      .catch(error => {
        <Redirect to="/error" />
    })
  }

  deleteCourse = async () => {
    const {context, history} = this.props;
    const {emailAddress, password} = context.authenticatedUser;
    const id = this.props.match.params.id; //target the id param

    await context.data.deleteCourse(id, emailAddress, password)
    .then(errors => {
      if(errors.length) {
        console.log(errors);
        this.setState({ errors });
      } else {
        console.log('Course deleted successfully.');
        history.push('/courses');
      }
    })
    .catch((error) => {
      console.log(error);
      history.push('error');
    })
  }

  render() {
    const {context} = this.props;
    const {course, author} = this.state;
    const authUser = context.authenticatedUser;
    const id = this.props.match.params.id; //target the id param

    return (
      //TODO: Check if course is true...
      <>
        <div className="actions--bar">
            <div className="wrap">
                {authUser && authUser.id === author.id ? (
                  <>
                  <a className="button" href={`/courses/${id}/update`}>Update Course</a>
                  <button className="button" onClick={this.deleteCourse}>Delete Course</button>
                  <a className="button button-secondary" href={`../courses`}>Return to List</a>
                  </>
                ) : (
                  <a className="button button-secondary" href={`../courses`}>Return to List</a>
                )}
              </div>
          </div>

          <div className="wrap">
              <h2>Course Detail</h2>
              <form>
                  <div className="main--flex">
                      <div>
                          <h3 className="course--detail--title">Course</h3>
                          <h4 className="course--name">{course.title}</h4>
                          <p>By {`${author.firstName} ${author.lastName}`}</p>
                          <ReactMarkdown>
                            {course.description}
                          </ReactMarkdown>
                      </div>
                      <div>
                          <h3 className="course--detail--title">Estimated Time</h3>
                          <p>{course.estimatedTime}</p>

                          <h3 className="course--detail--title">Materials Needed</h3>
                          <ReactMarkdown className="course--detail--list">
                            {course.materialsNeeded}
                          </ReactMarkdown>
                      </div>
                  </div>
              </form>
          </div>
        </>
        );

      }

}
