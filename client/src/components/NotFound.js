/*
* NotFound Component
* Stateless
* Displays a message to the user letting them know the requested page can't be found
*/
import React from 'react';

const NotFound = () => {
  return(
    <main>
        <div className="wrap">
            <h2>Not Found</h2>
            <p>Sorry! We couldn't find the page you're looking for.</p>
        </div>
    </main>
  );
}

export default NotFound;
