/*
// Statefull Component
// Get and render details of each course from the REST API DB
*/
import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'; //import ReactMarkdown for adding markdown to description & materialsNeeded properties

const url = "http://localhost:5000/api"; //url for REST API

export default class CourseDetail extends Component {
  state = {
    course: '',
    author: '',
    errors: [],
  }

  componentDidMount() {
    const id = this.props.match.params.id; //target the id param
    console.log(id);

    //use Fetch API to get course data to update
    fetch(`${url}/courses/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const courseData = data.course[0];
        const userData = data.course[0].User;

        //set state of course and author to be used during render()
        this.setState({
          course: courseData,
          author: userData,
        })
      })
      .catch(error => {
        <Redirect to="/error" />
    })
  }

  deleteCourse = async () => {
    const {context, history} = this.props;
    const {emailAddress, password} = context.authenticatedUser; //use valid credentials to delete a course
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
    const authUser = context.authenticatedUser; //used to verify is author has authorization to update or delete the course
    const id = this.props.match.params.id;

    //TODO: Add ReactMarkdown to description & materialsNeeded properties

    return (
      <>
        <div className="actions--bar">
            <div className="wrap">
                {authUser && authUser.id === author.id ? (
                  <>
                  <Link to={`/courses/${id}/update`} className="button">Update Course</Link>
                  <Link to='/' className="button" onClick={this.deleteCourse}>Delete Course</Link>
                  <Link to='/' className="button button-secondary">Return to List</Link>
                  </>
                ) : (
                  <Link to='/' className="button button-secondary">Return to List</Link>
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
