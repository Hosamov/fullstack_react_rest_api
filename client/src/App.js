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

import withContext from './Context';
import PrivateRoute from './PrivateRoute'; //for authenticated users only

//add context
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

const App = () => (
    <Router>
      <div>
        <HeaderWithContext />

          <Switch>
            <Route exact path="/"> <Redirect to="/courses"/> </Route>
            <PrivateRoute exact path='/courses/create' component={CreateCourseWithContext} />
            <PrivateRoute exact path='/courses/:id/update' component={UpdateCourseWithContext} />
            <Route exact path='/courses' component={CoursesWithContext} />
            <Route exact path='/courses/:id' component={CourseDetailWithContext} />
            <Route exact path='/signin' component={UserSignInWithContext} />
            <Route exact path='/signup' component={UserSignUpWithContext} />
            <Route exact path='/signout' component={UserSignOutWithContext} />
          </Switch>
      </div>
    </Router>
);

export default App;
