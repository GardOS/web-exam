# PG6300 Exam

## Application

### Functionality

**General:**
The application is an online multiplayer quiz game. After the users has logged in they can either create a new quiz in the quiz page or start playing in the game page. When the players are ready to play, they will enter a game lobby.

**Game lobby:**
The person who joins first will become the host of the lobby, and will have the authority to start the game once another player has joined. Everyone in the lobby will get a list of the current players in the lobby.

**Game:**
After the game has begun, a quiz in the database is chosen at random and the lobby is removed (allowing parallel matches). For each question, the players will be presented with a timer, a question and four answers to pick from. The players get 3 points if the answer is correct, and 0-2 points depending on the time it took to answer. If the player fails to answer the question within 10 seconds, the question is skipped and no points is given. The game will progress like this until there are no more questions in the quiz. When the quiz is done the results are presented, with the winner on top.

### Structure

#### Client

Represent the frontend and is structured like so:

- **client:** Holds logic applying to all pages.
  - **home:** Landing page. Either register/login page, or navigation.
  - **game:** Game page. Play game.
  - **quiz:** Quiz page. Create quizzes.

#### Server

Represent the backend and is structured like so:

- **server:** Holds logic applying to all sub-components.
  - **api:** Entry points to backend.
  - **game:** Game logic.
  - **ws:** Websockets. Real-time updates.

### Technologies

#### General

The project is written in JavaScript and is built using webpack/babel.

Libraries:

- Passport: Authentication.
- Socket.io: Real-time communication

#### Frontend

The frontend is a Single-Page-Application using React + React-Router.

#### Backend

The backend is a single NodeJS instance serving both the frontend and backend. The backend uses a MongoDB docker container as database.

Libraries:

- Express: Web Framework. Used for client communication.
- bcrypt: Password encryption
- Mongoose: Object Data Modeling for MongoDB

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

No project is 100% done. Below is what further development would have involved:

1. Improve the feedback from to the user. Currently window.alert() is used for notifying users, which is a bad practice. The feedback from the backend to frontend is also lacking. Where there are details happening that should be reflected to the client such as users leaving midgame etc.
2. The pages are pretty barren. The "plan" would be to include more stuff to do and see on each page and improve the design.
3. The game section should allow the players to create their own lobbies with it's own ID similar to "Kahoot!" and the ability to choose between quizzes.
4. The quiz section is not done and is lacking some functionality. Currently you can only create a quiz with a single question (or use the API), which is not ideal. The quiz section should also allow you to do all CRUD-operations.
5. The way the backend is designed is not robust enough. I'm sure there are ways to ensure that the backend crashes or is stuck if you put some effort in it, and I don't think there would be a way for it to recover without a reboot.
6. A leaderboard/highscore system for quizzes and individual players.
