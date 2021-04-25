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

  export default () => (
    <Router>
      <div>
        <Header />

          <Switch>
            <Route exact path="/"> <Redirect to="/courses"/> </Route>
            <Route exact path='/courses' component={Courses} />
            <Route exact path='/courses/:id' component={CourseDetail} />
            <Route exact path='/courses/:id/update' component={UpdateCourse} />
          </Switch>
      </div>
    </Router>
  );
