# Readable Project

This is my submission for the Readable project for React & Redux module of the Udacity React nanodegre course. The application allows users to create, edit and delete posts and comments and vote on the posts and comments.


## Installation and usage
The first step is to clone the repository. We will then run an api server and an application server separately as described below.

#### Api server
In your shell, navigate to the api-server directory, install the project dependencies and start the server:
```sh
$ cd /api-server
$ sudo npm install
$ node server
```

 #### Application server / Client
Open a new shell window, navigate to the applciation server directory, install the project dependencies and start the server:
```sh
$ cd /frontend
$ sudo npm install
$ yarn start
```
Open your browser and navigate to http://localhost:3000/

## Features
* Retrieves and lists all posts for all categories on the main page
* Category buttons can be used to filter posts by category
* New posts and comments can be added with the new post and new comment buttons respectively
* Posts and comments can be sorted by votes, comments and date
* All posts and comments can be edited from anywhere in the application

### Todos
* Add validations on all input fields

License
----

MIT

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)