import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';


import withContext from './Context';
import PrivateRoute from './PrivateRoute'; //for authenticated users only

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);

  export default () => (
      <Router>
        <div>
          <Header />

            <Switch>
              <Route exact path="/"> <Redirect to="/courses"/> </Route>
              <Route exact path='/courses' component={CoursesWithContext} />
              <Route exact path='/courses/:id' component={CourseDetailWithContext} />
              <Route exact path='/courses/:id/update' component={UpdateCourse} />
              <Route exact path='/signin' component={UserSignInWithContext} />
              <Route exact path='/signup' component={UserSignUpWithContext} />
            </Switch>
        </div>
      </Router>
  );
