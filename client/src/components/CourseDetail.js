//Stateful Component
import React, {useState, useEffect, useContext} from 'react';
//import {Context} from '../Context';
import axios from 'axios';

//URL
const url = `http://localhost:5000/api`;

function Courses() {
  const [course, setCourse] = useState({});
  const [canLoad, setCanLoad] = useState(true);

//Get courses using axios
  useEffect(() => {
    const getCourse = async () => {
      await axios.get(`${url}/courses/${course.id}`)
        .then(response => { //check for response
          if(response.status === 200) setCourse(response.data.courses) //add response data to courses state
        })
        .catch(error => {
          console.log('Error fetching and parsing data from database ', error);
        });
    }
      //if(courses.length === 0) getCourses(); //call variable so data may be retrieved
      //check if getCourses can load
      if(canLoad){
        getCourse(); // call function
        setCanLoad(false); // reset canLoad
      }
  });

  return (
    <div class="wrap main--grid">
      {(course =>
          <a class="course--module course--link" href={`/courses/${course.id}`} key={course.id}>
              <h2 class="course--label">Course</h2>
              <h3 class="course--title">{course.title}</h3>
          </a>
        )}
        <a class="course--module course--add--module" href="/courses/create">
            <span class="course--add--title">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" class="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                New Course
            </span>
        </a>
      </div>
  );
}

export default Courses;
