//Stateless Component

import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
  render() {
    //data used to determine what to display to the user
    //const { context } = this.props;
    //const authUser = context.authenticatedUser; //either an object holding auth user's name and username, or null

    return (
      <header>
        <div class="wrap header--flex">
            <h1 class="header--logo"><a href="/">Courses</a></h1>
            <nav>
                <ul class="header--signedout">
                    <li><a href="/signup">Sign Up</a></li>
                    <li><a href="/signin">Sign In</a></li>
                </ul>
            </nav>
        </div>
    </header>
    );
  }
};
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
