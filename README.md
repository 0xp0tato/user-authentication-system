<h1>User Authentication System</h1>

This project is a user authentication system implemented using Node.js, Express.js, and MongoDB. It provides essential features such as user registration, login, password management (including changing and resetting passwords), and retrieving user details.

Prerequisites

Make sure you have the following software installed on your machine:

    Node.js
    npm (Node Package Manager)
    MongoDB

Installation

    Clone the repository:

git clone https://github.com/your-username/user-authentication-system.git

Change into the project directory:

cd user-authentication-system

Install the dependencies:

    npm install

    Configure the MongoDB connection:
        Create a MongoDB database.
        Open the .env file and update the MONGODB_URI variable with your MongoDB connection string.

Usage

    Start the application:

    shell

    npm start

    Open your web browser and navigate to http://localhost:3000.

    Use the following endpoints to interact with the authentication system:
        POST /api/register - Register a new user.
        POST /api/login - Log in with an existing user.
        POST /api/user/password - Change the password of the logged-in user.
        GET /api/user - Retrieve details of the logged-in user.
        POST /api/user/reset-password - Send a password reset email to the user.

Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please create an issue or submit a pull request.
