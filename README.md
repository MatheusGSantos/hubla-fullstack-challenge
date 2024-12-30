# Project Setup

This project consists of a frontend and a backend, which can be run using Docker
Compose or locally. Below are the instructions for both methods.

## Prerequisites

- Node.js (version 20 or higher)
- Docker and Docker Compose

## Running with Docker Compose

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Start the services using Docker Compose:

   ```bash
   docker-compose up -d --build
   ```

3. Access the frontend at http://localhost:3000 and the backend at
   http://localhost:8000.

## Running Locally (recommended)

### Backend

Assuming you have ran the docker-compose and have only the postgres container
running.

1. From the root folder

   ```bash
   cd backend
   npm i
   cp .env.example .env
   ```

2. Add the environment variable values located in docker-compose.yml (project
   root folder). Since this is an example project, i kept them there so it's
   easier to run, but feel free to change the values.

3. Migrate database:

   ```bash
   npx prisma migrate dev
   ```

4. Start the backend server:

   ```bash
   npm run start:dev
   ```

5. The backend server will be running at http://localhost:8000.

6. You can go to http://localhost:8000/api/ in your browser to see the swagger
   docs or run `npx prisma studio` to see your database in the browser client

### Frontend

1. From the root folder
   ```bash
   cd frontend
   npm i
   npm run dev
   ```
2. The frontend application will be running at http://localhost:3000.

## Recommendations

- It is recommended to run both the frontend and backend locally for development
  purposes to take advantage of hot-reloading and easier debugging. Keep the
  Postgres container running inside docker, as it's the only component in this
  application that is always best to keep isolated to avoid environment
  conflicts.

- Use Docker Compose for a consistent environment setup, especially for testing
  and deployment.

## Additional Information

- For more details on the backend setup, refer to the backend/README.md.
- For more details on the frontend setup, refer to the frontend/README.md.
