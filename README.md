# PG6300 Exam

## About

## Application

### Functionality

### Structure

#### Client

Represent the frontend and is structured like so:

- **client:** Holds logic applying to all pages.
  - **home:** Landing page. Either register/login page, or navigation.
  - **hame:** Game page. Play game.
  - **quiz:** Quiz page. Create quizzes.

#### Server

Represent the backend and is structured like so:

- **server:** Holds logic applying to all sub-components.
  - **api:** Entry points to backend.
  - **game:** Game logic
  - **ws:** Websockets. Real-time updates.

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

1. Get rid of alerts and properly notify users.
2. The pages are pretty barren.
