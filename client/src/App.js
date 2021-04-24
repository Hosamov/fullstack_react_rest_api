import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import axios from 'axios';

//import Courses from './components/Courses';

//URL
//import apiBaseUrl from '../config.js';
const url = `http://localhost:5000/api`;


class App extends Component {

  constructor() {
    super();
    this.state = {
      courses: [],     //used to hold course results
      loading: true
    };
  }

  componentDidMount() {
    this.getCourses();
  }

  //handle loading
  loadingHandler() {
    if(!this.state.loading) {
      this.setState({
        loading: true
      });
    }
  }

  //Search function--fetches data and passes in user's input through query param
  getCourses = () => {

  //Fetch from search results
    axios.get(`${url}/courses`)
      .then(response => {
        console.log(response.data.courses);
        this.setState( {
          courses: response.data.courses,
          loading: false
      });
      //console.log(this.state.courses[1].title);
    })
    .catch(error => {
      console.log('Error fetching and parsing data from database ', error);
    });
  }


  render() {

    let loadState = this.state.loading;

    return(
      <div class="wrap main--grid">
        { this.state.courses.map(course =>
          <a class="course--module course--link" href={`/courses/${''}`}>
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

// useEffect(() => {
//   const getCourses = async () => {
//
//     await context.data.getCourses()
//       .then(response => response.data.json)
//       .then((data) => setCourses(data.courses))
//       .catch((err) => console.log(err))
//     }
//     getCourses();
// }, [context.data]);

  // export default () => (
  //   <Router>
  //     <div>
  //       <Switch>
  //         <Route exact path="/" component={Courses} />
  //       </Switch>
  //     </div>
  //   </Router>
  // );

}

export default App;




// //body contains all any data associated with the request
//   api(path, method = 'GET', body = null) {
//   const url = `http://localhost:5000/api/${path}`; //localhost:5000/api/[path]
//
//   //configuration (options) object that lets you control a number of different settings you can apply to the request
//   const options = {
//     method,
//     headers: {
//       'Content-Type': 'application/json; charset=utf-8',
//     },
//   };
//
//   //check if body is provided
//   if (body !== null) {
//     options.body = JSON.stringify(body); //stringify the options body
//   }
//
//   // //check if authentication is required
//   // if (requiresAuth) { //if making a request to a protected route on the server, authentication is required
//   //   const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`); //btoa() method encodes a string in base-64
//   //
//   //   //set an Authorization header on each request that requires authentication
//   //   options.headers['Authorization'] = `Basic ${encodedCredentials}`; //set Authorization type ot Basic, followed by encoded credentials
//   //   // Example authorization header: Authorization: Basic am9lQHNtaXRoLmNvbTpqb2U=
//   // }
//
//   return fetch(url, options); //pass url and 2nd param (options) to fetch() method
// }
//
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p> */}
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

//export default App;
