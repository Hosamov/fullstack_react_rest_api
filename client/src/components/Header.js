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
      <div class="wrap header--flex">
        <h1 class="header--logo"><a href="/">Courses</a></h1>
        <nav>
          { authUser ?
            <React.Fragment>
              <span>Welcome, {name}! </span>
              <Link to="/signout">Sign Out</Link>
            </React.Fragment>
          :
            <React.Fragment>
              <ul class="header--signedout">
              <Link className="signup" to="/signup">Sign Up </Link>
              <Link className="signin" to="/signin">Sign In </Link>
              </ul>
            </React.Fragment>
          }
        </nav>
      </div>
    </header>
  );
}

export default Header;

// export default class Header extends React.PureComponent {
//   render() {
//     //data used to determine what to display to the user
//     const { context } = this.props;
//     console.log("header " + context);
//     //const authUser = context.authenticatedUser; //either an object holding auth user's name and username, or null
//
//     return (
//       <></>
//
//     //   <header>
//     //     <div class="wrap header--flex">
//     //         <h1 class="header--logo"><a href="/">Courses</a></h1>
//     //         <nav>
//     //           { authUser ?
//     //             <React.Fragment>
//     //               <span>Welcome, {authUser.name}!</span>
//     //               <Link to="/signout">Sign Out</Link>
//     //             </React.Fragment>
//     //           :
//     //             <React.Fragment>
//     //               <ul class="header--signedout">
//     //               <Link className="signup" to="/signup">Sign Up</Link>
//     //               <Link className="signin" to="/signin">Sign In</Link>
//     //               </ul>
//     //             </React.Fragment>
//     //           }
//     //             {/* <ul class="header--signedout">
//     //                 <li><a href="/signup">Sign Up</a></li>
//     //                 <li><a href="/signin">Sign In</a></li>
//     //             </ul> */}
//     //         </nav>
//     //     </div>
//     // </header>
//     );
//   }
// };

//
// <div class="wrap header--flex">
//     <h1 class="header--logo"><a href="index.html">Courses</a></h1>
//     <nav>
//         <ul class="header--signedout">
//             <li><a href="sign-up.html">Sign Up</a></li>
//             <li><a href="sign-in.html">Sign In</a></li>
//         </ul>
//     </nav>
// </div>
