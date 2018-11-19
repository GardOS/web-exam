# PG6300 Exam

## About

## Application

### Functionality

### Structure

### Technologies

## Setting up and running application

### Prerequisites

1. Node/Npm
2. Docker installed and running
3. Docker-compose
4. Modern web browser

### Steps

1. `npm install`
2. `npm start`

Note: `npm start` is setting up a docker container in the background, since this is happening concurrently the app may have started before the container. To remedy this, there is a retry-policy in place. Therefore the application may not work until you see the message `Connected to MongoDB container`.

## Further development/improvements
