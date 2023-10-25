# COMS_4156_Project
Project Repo for Columbia's Advanced Software Engineering course

[![Coverage Status](https://coveralls.io/repos/github/msegal347/COMS_4156_Project/badge.svg)](https://coveralls.io/github/msegal347/COMS_4156_Project)

# FoodLink API

FoodLink is a food redistribution service designed to minimize food waste and address food insecurity. This repository contains the API for the FoodLink service.

## Table of Contents

- [Technologies](#technologies)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Docker Setup](#docker-setup)
  - [VS Code Dev Container](#vs-code-dev-container)
- [Development Environment](#development-environment)
  - [Coding Standards](#coding-standards)
  - [Jest Testing](#jest-testing)
  - [Postman Testing](#postman-testing)
  - [Continuous Integration](#continuous-integration)
- [API Documentation](#api-documentation)


## Technologies

- Node.js 20.x
- TypeScript
- MongoDB
- Docker & Docker Compose
- Jest for unit testing
- ESLint & Prettier for code linting and formatting
- GitHub Workflows for CI/CD
- VS Code Dev Containers for isolated development environments

## Setup

### Prerequisites

- Make sure you have Node.js (v20.x) installed. If not, download and install it from [nodejs.org](https://nodejs.org/).
- Make sure you have Docker installed. If not, download and install it from [Docker's website](https://www.docker.com/products/docker-desktop).
- If using VS Code Dev Containers, ensure you have Visual Studio Code and the Remote - Containers extension installed.

### Installation

1. Clone the repository:

    ```
    git clone https://github.com/msegal347/COMS_4156_Project.git
    ```

2. Navigate to the project directory:

    ```
    cd COMS_4156_Project
    ```

3. Install the npm packages:

    ```
    npm install
    ```

### Docker Setup

1. Build the Docker images:

    ```
    docker-compose build
    ```

2. Launch the Docker containers:

    ```
    docker-compose up
    ```

At this point, the API and MongoDB services should be running inside Docker containers. You can access the API at `http://localhost:3000`.

### VS Code Dev Container

If you're using Visual Studio Code, you can open the project in a dev container for a fully configured development environment.

1. Open the project folder in VS Code.
2. A notification will appear asking if you would like to reopen the project in a dev container. Click "Reopen in Container".
3. The dev container will build and start, providing an isolated development environment.

## Development Environment

### Coding Standards

This project uses ESLint for linting and Prettier for code formatting. To check for linting errors, run:

```
npm run lint
```

To automatically fix linting errors, run:

```
npm run lint:fix
```

To check for code formatting issues, run:

```
npm run prettier
```

To automatically fix code formatting issues, run:

```
npm run prettier:fix
```

### Jest Testing

We use Jest for unit testing. To run tests with code coverage, execute:

```
npm run test
```

### Postman Testing

We also provide a Postman collection for manual API testing. Follow these steps to use it:

1. **Download Postman**: If you haven't installed Postman, download and install it from [here](https://www.postman.com/downloads/).

2. **Import Collection**: Open Postman, go to the "Collections" tab, and click on the "Import" button. Upload the JSON file for the FoodLink API Postman collection.

3. **Set Environment Variables**: Go to the gear icon in the upper right corner to manage environments. Add new environment variables:

- `base_url` and set the value to `http://127.0.0.1:3000` or whatever URL and Port you set for you API Docker container.

- `mongo_db_url` and set the value to `http://127.0.0.1:27017/testDB` or whatever URL and Port you set for you MongoDB Docker container.

4. **Run Requests**: Now you can run individual API requests in Postman. Click on a request to load it and then hit the "Send" button to execute it. You can view the results in the lower half of the Postman window.

5. **View and Edit Headers and Body**: Before sending requests, you can view and edit headers and request body as needed.

6. **Export Results**: After running tests, you can export the results by clicking on the "Export" button next to the collection name.

### Continuous Integration

GitHub Workflows are set up for Continuous Integration. On each push or pull request to the `main` branch, the workflow will:

- Perform CodeQL analysis for security vulnerabilities
- Install dependencies
- Run ESLint
- Execute unit tests and generate a coverage report

### API Documentation

For API documentation, see the [API Documentation](API_Documentation.md) file.
---
