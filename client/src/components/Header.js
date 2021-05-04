//Stateless Component
import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const { context } = props;
  const authUser = context.authenticatedUser;
  let name;
  if(authUser) {
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
