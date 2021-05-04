//Stateful Component
import React, {useState, useEffect, useContext} from 'react';
import { Context } from '../Context';
import { useHistory, useParams} from 'react-router-dom'; //https://reactrouter.com/web/api/Hooks/useparams
import axios from 'axios';
import ReactMarkdown from 'react-markdown'; //used for basic markdown while rendering the data

const url = "http://localhost:5000/api";

function CourseDetail(props) {
  const context = useContext(Context);
  const history = useHistory();
  const [course, setCourse] = useState([]);
  const [user, setUser] = useState([]);
  const { id } = useParams();

//retrieve course components when components are mounted
useEffect(() => {
    //use axios to fetch course data
    axios.get(`${url}/courses/${id}`)
      .then(response => {
        setCourse(response.data.course[0])
        setUser(response.data.course[0].User)
        //console.log(response.data.course[0].User)
      })
      .catch(error => {
        console.log('Error fetching and parsing data from database ', error);
      })
  }, [id]);

  //declare empty variables in course state for the fetched data
  const {emailAddress, password} = context.authenticatedUser;

  const {
    User: { firstName, lastName} = {},
    description,
    estimatedTime,
    materialsNeeded,
    title
  } = course;


  const deleteCourse = async () => {
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

  return (
    <main>
      <div className="actions--bar">
          <div className="wrap">
              <a className="button" href={`/courses/${id}/update`}>Update Course</a> {/*Update Course*/}
              <button className="button" onClick={deleteCourse}>Delete Course</button> {/*Delete Course, if authorized*/}
              <a className="button button-secondary" href={`../courses`}>Return to List</a> {/*Return to List Button*/}
          </div>
      </div>

      <div className="wrap">
          <h2>Course Detail</h2>
          <form>
              <div className="main--flex">
                  <div>
                      <h3 className="course--detail--title">Course</h3>
                      <h4 className="course--name">{title}</h4>
                      <p>By {`${firstName} ${lastName}`}</p>
                      <ReactMarkdown>
                        {description}
                      </ReactMarkdown>
                  </div>
                  <div>
                      <h3 className="course--detail--title">Estimated Time</h3>
                      <p>{estimatedTime}</p>

                      <h3 className="course--detail--title">Materials Needed</h3>
                      <ReactMarkdown className="course--detail--list">
                        {materialsNeeded}
                      </ReactMarkdown>
                  </div>
              </div>
          </form>
      </div>
    </main>
  );
}

export default CourseDetail;
