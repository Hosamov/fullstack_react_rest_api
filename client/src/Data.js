//Use the REST API
import config from './config';

export default class Data {
  // api() method; used to make the GET and POST requests to the REST API
  // initialize requiresAuth and credentials params with default values in case no values or "undefined" gets passed for either
  api(path, method = 'GET', body = null) { //body contains all any data associated with the request
    const url = config.apiBaseUrl + path; //localhost:5000/api/[path]

    //configuration (options) object that lets you control a number of different settings you can apply to the request
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    //check if body is provided
    if (body !== null) {
      options.body = JSON.stringify(body); //stringify the options body
    }

    // //check if authentication is required
    // if (requiresAuth) { //if making a request to a protected route on the server, authentication is required
    //   const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`); //btoa() method encodes a string in base-64
    //
    //   //set an Authorization header on each request that requires authentication
    //   options.headers['Authorization'] = `Basic ${encodedCredentials}`; //set Authorization type ot Basic, followed by encoded credentials
    //   // Example authorization header: Authorization: Basic am9lQHNtaXRoLmNvbTpqb2U=
    // }

    return fetch(url, options); //pass url and 2nd param (options) to fetch() method
  }

  //Use api() method to get courses data
  async getCourses() {
    //make GET request to /courses endpoint
    const response = await this.api(`/courses`, 'GET', null);
    if (response.status === 200) {
      return response.json().then(data => data); //return json object containing courses
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  // //Use api() method to get authenticated user
  // //accepts two arguments: username, password, for passing data to the API
  // async getUser(username, password) {
  //   //make GET request to /users endpoint
  //   const response = await this.api(`/users`, 'GET', null, true, { username, password }); //require auth (true) and set credentials to an object (username, password)
  //   if (response.status === 200) {
  //     return response.json().then(data => data); //return json object containing user credentials
  //   }
  //   else if (response.status === 401) {
  //     return null;
  //   }
  //   else {
  //     throw new Error();
  //   }
  // }
  //
  // //Use api() method to create authenticated user
  // async createUser(user) {
  //   const response = await this.api('/users', 'POST', user); //make POST request, send new user data to /users endpoint
  //   if (response.status === 201) {
  //     return [];
  //   }
  //   else if (response.status === 400) {
  //     return response.json().then(data => {
  //       return data.errors;
  //     });
  //   }
  //   else {
  //     throw new Error();
  //   }
  // }
}
