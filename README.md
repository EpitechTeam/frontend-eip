# EIP Frontend project

## Tech

Technology use

* [ReactJs] - A JavaScript library for building user interfaces
* [Redux] -  A Predictable State Container for JS Apps
* [MDBBootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework
* [Docker] - To build production Environment

## Production

Build project images for production with docker-compose

```sh
$ docker-compose build
$ docker-compose up
```

## Developement

```sh
$ npm install
$ npm start
```

Go to for web application

```sh
localhost:3000
```

#### SSR Developement

Or you can build it with npm

And finally install dependencies and build optimized project

```sh
$ npm install
```

```sh
$ npm run build && sudo rm -rf run && mv -f build run && mv -f run/index.html base/index.html
```

```sh
$ npm install -g nodemon
$ nodemon --ignore node_modules/ --ignore src/ index.js
```

## Test

```sh
$ npm test
```

## CD/CI

We use Jenkins Pipeline to run test and validate the build production

[node.js]: <https://nodejs.org>
[MDBBootstrap]: <https://mdbootstrap.com/docs/react/>
[Express]: <https://expressjs.com>
[ReactJs]: <https://reactjs.org/>
[Redux]: <https://github.com/reduxjs/redux>
[Docker]: <https://github.com/docker>
