import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import CreateCourse from './components/CreateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
//error routes:
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';
import UnhandledError from './components/UnhandledError';

import withContext from './Context';
import PrivateRoute from './PrivateRoute'; //used by /courses/create & /coures/:id/update

//add context
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

//TODO: Add detailed code comments explaining how app functions work

const App = () => (
    <Router>
      <div>
        <HeaderWithContext />

          <Switch>
            <Route exact path="/"> <Redirect to="/courses"/> </Route>
            <PrivateRoute exact path='/courses/create' component={CreateCourseWithContext} />
            <PrivateRoute path='/courses/:id/update' component={UpdateCourseWithContext} />
            <Route exact path='/courses' component={CoursesWithContext} />
            <Route exact path='/courses/:id' component={CourseDetailWithContext} />
            <Route path='/signin' component={UserSignInWithContext} />
            <Route path='/signup' component={UserSignUpWithContext} />
            <Route path='/signout' component={UserSignOutWithContext} />

            <Route path='/forbidden' component={Forbidden} />
            <Route path='/notfound' component={NotFound} />
            <Route path='/error' component={UnhandledError} />
          </Switch>
      </div>
    </Router>
);

export default App;
