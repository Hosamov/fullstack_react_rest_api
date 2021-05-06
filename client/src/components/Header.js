/*
* Header Component
* Stateless
* Renders a global Header for the app
*/
import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const { context } = props; //import context
  const authUser = context.authenticatedUser; //import user data from context
  let name;
  if(authUser) { //check if a user is successfully logged in and render their name in the header
    name = `${authUser.firstName} ${authUser.lastName}`;
  } else {
    name = {}
  }

  return(
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo"><a href="/">Courses</a></h1>
        <nav>
          { authUser ?
            <React.Fragment>
              <span>Welcome, {name}! </span>
              <Link to="/signout">Sign Out</Link>
            </React.Fragment>
          :
            <React.Fragment>
              <ul className="header--signedout">
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/signin">Sign In</Link></li>
              </ul>
            </React.Fragment>
          }
        </nav>
      </div>
    </header>
  );
}

export default Header;
