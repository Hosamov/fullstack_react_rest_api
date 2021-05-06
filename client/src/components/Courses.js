/*
* Courses Component
* Stateful
* Courses() function to fetch a list of courses from the REST API db
* This component is different from the others as it uses a function rather than a class.
*/
import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Context } from '../Context'; //import context here as we're using a function instead of class

function Courses(props) {
  const context = useContext(Context);
  const [canFetch, setCanFetch] = useState(true); //setup state to track/allow fetching of courses data
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      //Get courses using data with context
      await context.data.getCourses()
        .then( response => { //check for response
          if(response.courses.length > 0) { //ensure there are existing courses
            setCourses(response.courses) //add response data to courses state
          } else {
            <Redirect to="/error" /> //if no course data exists, send to /error route
          }

        })
        .catch(error => {
          console.log('Error fetching and parsing data from database ', error);
          <Redirect to="/error" />
        });
    }
      //check if getCourses can load
      if(canFetch){
        getCourses();
        setCanFetch(false);
      }
  }, [canFetch, courses, context.data]);

  return (
    <div className="wrap main--grid">
      { courses.length > 0 ?
          courses.map(course =>
            <Link className="course--module course--link" to={`/courses/${course.id}`} key={course.id}>
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">{course.title}</h3>
            </Link>
          ) : <h2>Loading...</h2> }
          <Link className="course--module course--add--module" to="/courses/create">
              <span className="course--add--title">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                  viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                  New Course
              </span>
          </Link>
        </div>
  );
}

export default Courses;
