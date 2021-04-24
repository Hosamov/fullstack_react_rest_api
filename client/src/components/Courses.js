import React, {useState, useEffect, useContext} from 'react';
import {Context} from '../Context';

export default function Courses (props) {
  const [courses, setCourses] = useState([]);
  const context = useContext(Context);


  useEffect(() => {
    const getCourses = async () => {

      await context.data.getCourses()
        .then(response => response.data.json)
        .then((data) => setCourses(data.courses))
        .catch((err) => console.log(err))
      }
      getCourses();
  }, [context.data]);

   return (
     <div class="wrap main--grid">
       { courses.map(course =>
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
