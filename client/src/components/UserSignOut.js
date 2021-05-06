/*
* Stateless Component
* Signs out currently logged-in authenticated user
*/
import React, { useEffect } from 'react'; //import useEffect
import { Redirect } from 'react-router-dom';

const UserSignOut = ({ context }) => {
  //component calls signOut and updates state after render
  useEffect(() => context.actions.signOut()); //perform the signout
  return (
    <Redirect to="/" />   //redirect to home route
  );
}

export default UserSignOut;
