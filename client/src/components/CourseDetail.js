//Stateful Component
import React, {useState, useEffect, useContext} from 'react';
import { Context } from '../Context';
import { useParams } from 'react-router-dom'; //https://reactrouter.com/web/api/Hooks/useparams
import axios from 'axios';
import ReactMarkdown from 'react-markdown'; //used for basic markdown while rendering the data

const url = "http://localhost:5000/api";


//TODO: add user authorization

function CourseDetail(props) {
  const context = useContext(Context);

  const [course, setCourse] = useState([]);
  //const [canLoad, setCanLoad] = useState(true);
  const { id } = useParams();

//retrieve course components when components are mounted
useEffect(() => {
    //use axios to fetch course data
    axios.get(`${url}/courses/${id}`)
      .then(response => setCourse(response.data.course[0]))
      .catch(error => {
        console.log('Error fetching and parsing data from database ', error);
      })
  }, [id]);

  //declare empty variables in course state for the fetched data
  const {
    User: { emailAddress, firstName, lastName} = {},
    description,
    estimatedTime,
    materialsNeeded,
    title
  } = course;

  const deleteCourse = async () => {
    await context.data.deleteCourse(id)
      .then(response => response)
      .catch(error => {
        console.log('Error fetching and parsing data from database ', error);
      })
  }

  return (
    <main>
      <div class="actions--bar">
          <div class="wrap">
              <a class="button" href={`/courses/${id}/update`}>Update Course</a> {/*Update Course*/}
              <a class="button" onClick={deleteCourse}>Delete Course</a> {/*Delete Course, if authorized*/}
              <a class="button button-secondary" href={`../courses`}>Return to List</a> {/*Return to List Button*/}
          </div>
      </div>

      <div class="wrap">
          <h2>Course Detail</h2>
          <form>
              <div class="main--flex">
                  <div>
                      <h3 class="course--detail--title">Course</h3>
                      <h4 class="course--name">{title}</h4>
                      <p>By {`${firstName} ${lastName}`}</p>
                      <ReactMarkdown>
                        {description}
                      </ReactMarkdown>
                  </div>
                  <div>
                      <h3 class="course--detail--title">Estimated Time</h3>
                      <p>{estimatedTime}</p>

                      <h3 class="course--detail--title">Materials Needed</h3>
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
