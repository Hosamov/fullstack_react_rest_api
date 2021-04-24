//Stateful Component
import React, {useState, useEffect, useContext} from 'react';
//import {Context} from '../Context';
import axios from 'axios';

//URL
const url = `http://localhost:5000/api`;

function Courses() {
  const [courses, setCourses] = useState([]);

//Get courses using axios
  useEffect(() => {
    const getCourses = async () => {
      await axios.get(`${url}/courses`)
        .then(response => { //check for response
          if(response.status === 200) setCourses(response.data.courses) //add response data to courses state
        })
        .catch(error => {
          console.log('Error fetching and parsing data from database ', error);
        });
    }
    getCourses(); //call variable so data may be retrieved
  });

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

export default Courses;




// class Courses extends Component {
//
//   constructor() {
//     super();
//     this.state = {
//       courses: [],     //used to hold course results
//       loading: true
//     };
//   }
//
//   componentDidMount() {
//     this.getCourses();
//   }
//
//   //handle loading
//   loadingHandler() {
//     if(!this.state.loading) {
//       this.setState({
//         loading: true
//       });
//     }
//   }
//
//   //Search function--fetches data and passes in user's input through query param
//
//   getCourses = () => {
//
//   //Fetch from search results
//     axios.get(`${url}/courses`)
//       .then(response => {
//         this.setState( {
//           courses: response.data.courses,
//           loading: false
//       });
//     })
//     .catch(error => {
//       console.log('Error fetching and parsing data from database ', error);
//     });
//   }
//
//   render() {
//     // let loadState = this.state.loading;
//
//     return(
//       <div class="wrap main--grid">
//         { this.state.courses.map(course =>
//           <a class="course--module course--link" href={`/courses/${course.id}`} key={course.id}>
//               <h2 class="course--label">Course</h2>
//               <h3 class="course--title">{course.title}</h3>
//           </a>
//         )}
//         <a class="course--module course--add--module" href="/courses/create">
//             <span class="course--add--title">
//                 <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
//                 viewBox="0 0 13 13" class="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
//                 New Course
//             </span>
//         </a>
//       </div>
//     );
//   }
// }
// export default Courses;