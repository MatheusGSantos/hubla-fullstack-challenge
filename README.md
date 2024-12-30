# Project Setup

This project consists of a frontend and a backend, which can be run using Docker
Compose or locally. Below are the instructions for both methods.

## Prerequisites

- Node.js (version 14 or higher)
- Docker and Docker Compose

## Running with Docker Compose

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Start the services using Docker Compose:

   ```bash
   docker-compose up --build
   ```

3. Access the frontend at http://localhost:3000 and the backend at
   http://localhost:8000.

## Running Locally (recommended)

### Backend

1. From the root folder

   ```bash
   cd backend
   npm i
   cp .env.example .env
   ```

2. Add the environment variable values located in docker-compose.yml (project
   root folder). Since this is an example project, i kept them there so it's
   easier to run, but feel free to change the values.

3. Start the backend server:

   ```bash
   npm run start:dev
   ```

4. The backend server will be running at http://localhost:8000.

5.

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
