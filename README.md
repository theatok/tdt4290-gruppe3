# ErgoWeb
ErgoWeb is an app created to help Ergotjenesten i Trondheim with their workflow. The app is based on having a React frontend and 
NodeJS using Express backend, and a MongoDB NoSQL database.

## Getting started
### Pre-requisites
Using `docker` and `docker-compose` to install and run the app is highly recommended. We recommend using a linux based OS, as it is easiest to use Docker on linux. Docker can be installed by:

- **Linux:** `apt-get install docker docker-compose`
- **OS X:** https://docs.docker.com/docker-for-mac/install/
- **Windows:** https://docs.docker.com/docker-for-windows/install/

### Installing and running the system with Docker (Recommended)
1. Open a terminal and navigate to the root folder of the project, containing the `docker-compose.yml` file, run: 
`docker-compose build` to 
build the docker 
image. This 
will install and setup the frontend, backend and database.
2. When the docker image is built, run: `docker-compose up` to start the image containing everything needed to run the app.
3. The app should now be up and running.


### Installing and running the system without Docker
#### Client
1. Open a terminal and navigate to the `client` folder.
2. run: `npm install` to install the necessary modules
3. while in the client folder, run: `npm start`. The website will now run from `http://localhost:1234/`

#### MongoDB
1. Install [MongoDB](https://docs.mongodb.com/v3.2/administration/install-community/)
2. Open a terminal, and run `mongod`
3. MongoDB should now open and run on port `27017`. This should be the default value specified in the `api/config/default.json` file. (We will be using an remote version of MongoDB on the production. This is only for local testing)

#### API 
1. Open a terminal and navigate to the `api` folder
2. Run `npm install` to install the necessary modules
3. While in the `api` folder, run `npm start`. The API will now run on the specified port given in the `config/defaul.json` file.
4. Check that MognoDB connected sucsessfully by viewing the 


## Running tests
The application has two separate parts, the api and the client, and these are tested separately. To test the api, navigate to the `/api` folder from the root directory and run `npm test`. Similarly, to test the client side, navigate to the `/client` folder from the root directory and run `npm test`. 

## Developing
While developing this application, we have made up some recommendations and tips for developing.

### Environment
Using Docker is recommended while developing, as it makes sure that the API, client and database is running simultaneously. 

### Frontend
If you are only developing for the frontend, running `npm start` in the `client` folder is sufficient. You might need to disable the `PrivateRoutes` that requires you to be logged in. Therefore, using docker is recommended.

### API
Developing and testing routes for the API can be done using [Postman](https://www.getpostman.com/). Calling routes in frontend is done through `Redux`, specifically using `actions` and `reducers`. These can be foundn in the `client/src/` folder.

### Generating dummy data
As the database is by defualt empty, the posibility for generating dummy data was added. Dummy data may be generated by running the following command:
`docker exec api nodemon utils/generateDummyData.js --exec babel-node --presets babel-preset-env`
This will add the users defined in `api/dummy_data/dummyUsers.json` and add a number of cases defined in `api/utils/generateDummyData.js`'s constant `const numberOfCasesToGenerate;`

## Deployment
When deploying the system to a server, it is important to remember a few things:

1. The app is by default using a local version of MongoDB, as it is more convenient and safe to use while developing. Using this on a production build is **NOT RECOMMENDED** as destroying the Docker container also destroys the database. We recommend using *MongoDB Atlas*, a cloud based MongoDB instance. Remember to change the `api/config/default.json` to support the new 
2. For authentication, we use JsonWebTokens (jwt). JWT requires a *secret phrase* which is used as a seed when it is generating tokens. We **HIGHLY RECOMMEND** changing this to something other than the default phrase.

## Known Issues
### Docker
1. Docker might sometimes claim that a `Relative path cannot be used`. We suspect it being something wrong with our docker configurations, but have not discovered why. The simplest fix for this, is deleting the container and rebuilding is. This can be done by running `docker-compose down && docker-compose build`

2. Docker doesn't always hot-reload the frontend changes done. We are not entirely sure why it only happens a ocasionally, but we suspect it being how `npm` is configured.

### npm
1. While starting an instance of the app, it sometimes claims that specific packages are not found. This is probably because you have installed a new packages, without building it. This especially happens when using docker. Running `docker-compose build` usually fixes the problem. If this doesn't work, try deleting your `node_modules` in both the `api` and `client` folders.

### MongoDB
1. When developing locally, we have had some problems changing the connection port for MongoDB. This hasn't really been a big problem for us, as the local database only is used when developing, and we have just continued to use the default `27017` port.
2. If you already have something running on the port MongoDB is supposed to use, MongoDB will not initialize sucsessfully. Normally this is caused by you having installed MongoDB locally on your computer, and already utilizing port `27017`. This problem is best solved by stopping your local MongoDB instance. This can be done by following the instructions in [this link](https://stackoverflow.com/questions/11774887/how-to-stop-mongo-db-in-one-command/11777141).

### .babelrc
1. When running `npm test` in the `/api` folder, you may have to edit the `.babelrc` file in that folder for the tests to run without errors. Simply open the `.babelrc` file in your code editor and remove `presets: ["es2015"]`. This will make the tests run, but the application will not work properly when running `docker-compose up`. To make it run again, when done with testing, simply change back the `.babelrc` file by adding back `presets: ["es2015"]` and the application should work. 
2. Similarly, when running `npm test` in the `/client` folder, you may have to edit the `.babelrc` file in that folder for the tests to run without errors. Simply open the `.babelrc` file in your code editor and change `env` and `react` under `presets` to `@babel/preset-env` and `@babel/preset-react` respectively. You may be prompted to install these packages. 
