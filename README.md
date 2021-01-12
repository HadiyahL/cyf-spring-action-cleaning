<a href="https://spring-action-cleaning.herokuapp.com/">
    <img src="./client/src/assets/logo.png" alt="Spring action cleaning logo" title="Spring Action Cleaning" align="right" height="60" />
</a>

Spring action cleaning
======================

A full-stack PERN (PostgreSQL, Express, React, Node) project that aims to ease the tracking and recording of workers' hours.

[![Spring Action Cleaning demo](./client/src/assets/screenshots.png)](https://spring-action-cleaning.herokuapp.com/)

## Table of content

- [Prerequisites](#prerequisites)
- [Local setup](#setup-to-run-locally)
    - [Auth0 configuration](#auth0-configuration)
    - [Notes](#notes)
- [Features](#features)
- [Debugging](#debugging)
- [Starter Kit](#starter-kit)
- [Troubleshooting](#troubleshooting)

## Prerequisites
- [Node] (10+)
- [PostgreSQL](https://www.postgresql.org/download/)
- Free [Auth0](https://auth0.com/) account
- Terminal access
- Web browser

## Setup to run locally
- Fork and clone this repository
- Install packages by running `npm install` in the project's root directory from your terminal.
- Create `.env` file and populate with your values. Check `.env.example` for variables/format used.
``` bash
DB_NAME=spring-action-cleaning # your database name
DB_PASSWORD=1234 # your database password
```

### Auth0 configuration

For application to work properly regarding user roles you have to properly configure your auth0.com application 


- When you signed up for Auth0, a new application was created for you, or you could have created a new one.
- Get Domain and Client ID from [application settings](https://manage.auth0.com/#/applications) and update `/client/src/components/auth/config.js` file's domain and clientId values with yours.
- Configure Callback, Logout and Allowed Web Origins in the application settings (probably it's `http://localhost:3000` for development and after a comma, you can add production URL). 
- Create a new API and in the RBAC settings switch ON the `Enable RBAC` and `Add Permissions in the Access Token` toggles.
  - Add the API identifier (in the format of `https://yourname/`) as audience value in the auth config file.
  - Change `roleUrl` value in the config file to `https://yourname/roles`
- In the `/server/middleware.js` file in `checkAuth()` function change `jwksUri`, `audience` and `issuer` values with your Domain and API identifier values.
- In the Users & Roles section create two new roles: `admin` and `worker`.
- For the `admin` add these permissions:

Permission | Description
--- | ---
get:branches | Get branches
get:branches/:branch_id | Get branch by id
get:branches/customer/:customer_id | Get branches by customer id
get:customers | Get customers
get:customers/:id | Get customer by id
get:jobs | Read jobs
get:jobs/branches/:id | Get jobs info for branch
get:jobs/customers/:id | Get jobs info for customer
get:jobs/:id | Get job by id
get:jobs/range | Get jobs for specified date rang
get:jobs/workers/:id | Get jobs info for worker
get:reports/customer | Get reports for customer from start to end date
get:reports/customer_total | Get total hours worked for this customer
get:reports/worker | Get hours worked for different addresses
get:reports/worker_total | Get total hours worked by the worker for specified period
get:workers | Read workers
get:workersById | Get worker by id
post:batch_of_jobs | Post multiple jobs at once
post:branches/:customerId | Post branch
post:customers | Post customer
post:jobs | Post job
post:workers | Post workers
put:branches/:customerId/:branchId | Update branch
put:customers/:id | Update customer
put:jobs/:id | Update job
put:jobs/:id/log_time | Update job start and end times
put:workers | Update workers

- For the `worker` role add these permissions:

Permission | Description
--- | ---
get:workers/job/:id | Worker access single job
get:workers/jobs | Worker access his jobs
put:jobs/:id/log_time | Worker update job start and end times

- Now you need to add the following rules [rules](https://auth0.com/docs/rules):

1. Rule to assign a role to the user on the first login. You can get role id from the address bar when you are in the role page, it's in the format of `rol_xxxxxxxxxxxxxxxx` in the URL.
```javascript
function (user, context, callback) {
  	const ManagementClient = require('auth0@2.31.0').ManagementClient;

    const management = new ManagementClient({
      token: auth0.accessToken,
      domain: auth0.domain
    });
  
    const count = context.stats && context.stats.loginsCount ? context.stats.loginsCount : 0;
    if (count > 1) {
        return callback(null, user, context);
    }
		
    const params =  { id : user.user_id};
  	const { email } = user;
  	const adminsEmails = ['foo@bar.com', 'admin@baz.com']; // populate this array with admins emails
    let role;
  	if (adminsEmails.includes(email)) {
      role = ['rol_xxxxxxxxxxxxxxxx']; // admin's roleId
    } else {
    	role = ['rol_xxxxxxxxxxxxxxxx']; // worker's roleId
    }
    const data = { "roles" : role};

    management.users.assignRoles(params, data, function (err, user) {
      if (err) {
        // Handle error.
        console.log(err);
      }
    callback(null, user, context);
    });
   
}
```

2. Rule to add roles to the Access Token:
```javascript
function (user, context, callback) {
  const namespace = 'https://changeWithyourAPIidentifier';
  const assignedRoles = (context.authorization || {}).roles;

  let idTokenClaims = context.idToken || {};
  let accessTokenClaims = context.accessToken || {};

  idTokenClaims[`${namespace}/roles`] = assignedRoles;
  accessTokenClaims[`${namespace}/roles`] = assignedRoles;

  context.idToken = idTokenClaims;
  context.accessToken = accessTokenClaims;

  callback(null, user, context);
}
```

3. Rule to add email to the Access Token
```javascript
function addEmailToAccessToken(user, context, callback) {
  const namespace = 'https://changeWithyourAPIidentifier/';
	
  context.accessToken[namespace + 'email'] = user.email;
  
  return callback(null, user, context);
}
```

4. (Optional but recommended) Rule to force email verification
```javascript
function emailVerified(user, context, callback) {
  if (!user.email_verified) {
    return callback(
      new UnauthorizedError('Please verify your email before logging in.')
    );
  } else {
    return callback(null, user, context);
  }
}
```
That was a lot but now your role based access control system should be all set and working!

If you need to see more examples of auth0 and react you can check [this](https://auth0.com/blog/complete-guide-to-react-user-authentication/), [this](https://auth0.com/docs/quickstart/spa/react) and [this](https://auth0.com/docs/libraries/auth0-react) resource.

### Notes

- Role based access control in the frontend (see `client/src/App.js`) is implemented [the naive way](https://auth0.com/blog/role-based-access-control-rbac-and-react-apps/#Handling-Authorization-in-React-Apps--the-Naive-Way). [There is a better architecture pattern](https://auth0.com/blog/role-based-access-control-rbac-and-react-apps/#Role-Based-Access-Control--a-Better-Solution) more suited for scaling and larger apps.
- Various scripts are provided in the package file, but many are helpers for other scripts; here are the most needed ones:
  - `dev`: starts the frontend and backend in dev mode, with file watching (note that the backend runs on port 3100, and the frontend is proxied to it).
  - `lint`: runs ESLint against all the JavaScript in the project.
  - `serve`: builds and starts the app in production mode locally.
  - `populatedb:local`: automatically create a database on your machine and populates it with fake data for local development. Name of the created database is `spring-action-cleaning`, so update your `.env` file's `DB_NAME` variable to use this name. Depending on your setup it might prompt you to enter your database password.
  - `test`: runs unit tests.

- CSP (content security policy) is turned off by default.
``` javascript
helmet({
  contentSecurityPolicy: false
})
```

## Features

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

 - [x] Full stack ES8+ with [Babel]
 - [x] [Node] LTS support (verified working on 10.x, 12.x and 14.x LTS releases)
 - [x] [Express] server
 - [x] [React] client with [Webpack]
 - [x] Linting with [ESLint]
 - [x] Dev mode (watch modes for client and server, proxy to avoid CORS issues)
 - [x] Production build (single deployment artifact, React loaded via CDN)
 - [x] [Heroku Postgres] database
 - [x] [Heroku] deployment
 - [x] [Cloud Foundry] deployment
 - [x] [Docker] build

### Debugging

While running the dev mode using `npm run dev`, you can attach the Node debugger to the server process via port 9229.
If you're using VS Code, a debugging configuration is provided for this.

There is also a VS Code debugging configuration for the Chrome debugger, which requires the recommended Chrome
extension, for debugging the client application.

### Starter-Kit
This project was started with this [starter-kit].

### Troubleshooting

See the guidance in the starter kit's [wiki].

  [Babel]: https://babeljs.io/
  [Cloud Foundry]: https://www.cloudfoundry.org/
  [collaborators]: https://help.github.com/en/articles/inviting-collaborators-to-a-personal-repository
  [Docker]: https://www.docker.com
  [ESLint]: https://eslint.org/
  [Express]: https://expressjs.com/
  [Express router]: https://expressjs.com/en/guide/routing.html#express-router
  [Heroku]: https://www.heroku.com/
  [Heroku Postgres]: https://www.heroku.com/postgres
  [Node]: https://nodejs.org/en/
  [pull request]: https://help.github.com/en/articles/about-pull-requests
  [React]: https://reactjs.org/
  [Webpack]: https://webpack.js.org/
  [wiki]: https://github.com/textbook/starter-kit/wiki
  [Starter-kit]: https://github.com/textbook/starter-kit/