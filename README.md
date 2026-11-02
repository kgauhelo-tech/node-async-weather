# Async Weather & News Dashboard

## Overview

This project is a simple Node.js application that serves to apply the basics of Node JS and use various techniques (callbacks, promises, async/await) to ensure that the application works with each technique.
It uses Node.js' built-in HTTP module and file system capabilities to return weather and news data in a JSON format.

## Features

- **View the weather based on location, and view headlines** by sending GET requests.
- **Fetch data asynchronously** from external APIs.
- **Read the entire shopping list** with GET requests.
- **Implement the functionality using:**
  - `Callbacks`
  - `Promises`
  - `Async/Await`

## Endpoint

### `GET http://localhost:4000/callback?lat=-28.1036&lon=26.8669`

Fetches the weather and headlines data and returns it in a JSON format.

## Requirements

- Node.js installed on your machine.

## Setup and Installation

1. Clone the repository:
   ```bash
   git init
   git clone https://github.com/kgauhelo-tech/node-async-weather.git
   ```
2. Navigate to the project directory:
   ```bash
   cd node-shopping-list-api
   git switch dev
   ```
3. Install the necessary dependencies (if any):
   ```bash
   npm install
   ```

## Running the Server server that uses callbacks

Start the callback server on port 4000 by running:

```bash
npm run callback
```

## Running the Server server that uses promises

Start the callback server on port 4000 by running:

```bash
npm run promise
```

## Running the Server server that uses async/await

Start the callback server on port 4000 by running:

```bash
npm run async
```

The servers will be available at `http://localhost:4000`.

## Testing

Use Postman or a similar tool to test the API endpoints on a local device.

### Example for GET request:

- URL: `http://localhost:4000/items`
- Method: `GET`

## License

This project is licensed under the MIT License.
