//Use the REST API
export default class Data {
  // api() method; used to make the GET and POST requests to the REST API
  // initialize requiresAuth and credentials params with default values in case no values or "undefined" gets passed for either
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) { //body contains all any data associated with the request
    const url = 'http://localhost:5000/api' + path; //localhost:5000/api/[path]

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

    //check if authentication is required
    if (requiresAuth) { //if making a request to a protected route on the server, authentication is required
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`); //btoa() method encodes a string in base-64; find by emailAddress

      //set an Authorization header on each request that requires authentication
      options.headers['Authorization'] = `Basic ${encodedCredentials}`; //set Authorization type ot Basic, followed by encoded credentials
      // Example authorization header: Authorization: Basic am9lQHNtaXRoLmNvbTpqb2U=
    }

    return fetch(url, options); //pass url and 2nd param (options) to fetch() method
  }

  // GET Course
  async getCourses() {
    const response = await this.api('/courses', 'GET', null);
    if(response.status === 200) {
      return response.json().then(data => data); //return json object containing courses data
    } else if (response.status === 404 || response.status === 500) {
      throw new Error();
    }
  }

  // POST/create Course
  async createCourse(course, username, password) {
    const response = await this.api('/courses', 'POST', course, true, {username, password}); //make POST request, send new course data to /courses endpoint
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      //log error to the console
      return response.json()
        .then((error) => {
          console.log(error);
        });
    }
  }

  // // PUT/Update Course
  // async updateCourse(id, course, user, password) {
  //   const response = await this.api('/courses', 'PUT', course, true, {user, password}); //make POST request, send new user data to /users endpoint
  //   if (response.status === 204) {
  //     return [];
  //   }
  //   else if (response.status === 401) {
  //     return response.json().then(data => {
  //       return data.errors;
  //     });
  //   }
  //   else {
  //     throw new Error();
  //   }
  // }


  // DELETE Course
  async deleteCourse(id) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null);
    if(response.status === 204) {
      return response.json().then(data => data);
    } else if (response.status === 401 || response.status === 500) {
      throw new Error();
    }
  }

  //Use api() method to get authenticated user
  //accepts two arguments: username, password, for passing data to the API
  async getUser(emailAddress, password) {
    //make GET request to /users endpoint
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password }); //require auth (true) and set credentials to an object (username, password)
    if (response.status === 200) {
      return response.json().then(data => data); //return json object containing user credentials
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  //Use api() method to create authenticated user
  async createUser(user) {
    const response = await this.api('/users', 'POST', user); //make POST request, send new user data to /users endpoint
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}
