/*
* UnhandledError Component
* Stateless
* Displays a message to the user letting them know an unexpected error has occurred
*/
import React from 'react';

const UnhandledError = () => {
  return(
    <main>
        <div className="wrap">
            <h2>Error</h2>
            <p>Sorry! We just encountered an unexpected error.</p>
        </div>
    </main>
  );
}

export default UnhandledError;
