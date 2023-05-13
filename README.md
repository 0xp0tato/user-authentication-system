<h1>User Authentication System</h1>

This project is a user authentication system implemented using Node.js, Express.js, and MongoDB. It provides essential features such as user registration, login, password management (including changing and resetting passwords), and retrieving user details.

Prerequisites

Make sure you have the following software installed on your machine:

    Node.js
    npm (Node Package Manager)
    MongoDB

Installation

    Clone the repository:

git clone https://github.com/0xp0tato/user-authentication-system

Change into the project directory:

cd user-authentication-system

Install the dependencies:

    npm install

    Configure the MongoDB connection:
        Create a MongoDB database.
        Open the .env file and update the MONGODB_URI variable with your MongoDB connection string.

Usage

    Start the application:

    npm start

    Open your web browser and navigate to http://localhost:3000.

    Use the following endpoints to interact with the authentication system:
        POST /api/user/register - Register a new user.
        POST /api/user/login - Log in with an existing user.
        POST /api/user/changepassword - Change the password of the logged-in user.
        GET /api/user/loggeduser - Retrieve details of the logged-in user.
        POST /api/user/send-reset-password-email - Send a password reset email to the user.
        POST /api/user/reset-password/:id/:token - Reset the password of an existing user with id->:id and token->:token

Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please create an issue or submit a pull request.
