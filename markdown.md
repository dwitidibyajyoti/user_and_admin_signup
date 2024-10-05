# Starting the Server

To set up and run the application, follow these steps:

## Prerequisites

Make sure you have Docker and Docker Compose installed on your machine. You can download them from the following links:

- [Docker Installation](https://docs.docker.com/get-docker/)
- [Docker Compose Installation](https://docs.docker.com/compose/install/)

## Setup Instructions

1. **Copy the Example Environment File**

   First, you need to create a `.env` file by copying the example provided:

   ```bash
   cp example.env .env


## Accessing the Application
Once the application is running, you can access it in your web browser using the following URLs:

Admin Signup: http://localhost:3000/admin/signup
User Signup: http://localhost:3000/signup
User Login: http://localhost:3000/login
Admin Login: http://localhost:3000/admin/login






Notes
Ensure that the Docker containers are running without errors. You can check the logs in the terminal where you ran docker-compose up.
If you make changes to the code, you might need to rebuild the containers by running:


docker-compose up --build