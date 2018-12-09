# LavaMap-Assignment
Full Stack Developer

Single Page Application using MongoDB, ExpressJS, AngularJS, and NodeJS (MEAN stack).

### Installation
****
The app requires [Node.js](https://nodejs.org/en/download/) and [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) to run.

Install the dependencies and start the server :
```sh 
$ npm install
$ npm run start 
```
and it should start at `http://localhost:8080`.

****
If it won't start, check the port number of your MongoDB server and change the mongoDB port number in `./mongodb.js`. Default should be `27017`.

```sh 
var mongoose = require('mongoose');
var mongodbPort = 27017; //<-- change to your MongoDB port number
```


****

**Thank You!**
