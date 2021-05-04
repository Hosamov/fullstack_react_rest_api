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
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';

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
          </Switch>
      </div>
    </Router>
);

export default App;
