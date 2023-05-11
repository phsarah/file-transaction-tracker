# Sales File Transaction Manager API

This is an API for sales file transaction management. 
It allows you to upload a TXT file containing sales transaction data and manages this information.

## Endpoints

The Sales File Transaction Manager API has the following endpoints:

### Upload Transactions

Endpoint for uploading a file containing sales transactions.

**URL**: `/transactions/upload`

**Method**: `POST`

**Form Parameters**:
- `file`: File containing sales transactions (supported format: TXT).

**Example Request:**

```bash
POST /transactions/upload

Request Body:
FormData {
  file: <file.txt>
}
```

**Success Response**:
- Status Code: `200 OK`
- Response Body: None

**Error Response**:
- Status Code: `400 Bad Request`
- Response Body: Error details

### Get All Transactions

Endpoint for retrieving all sales transactions.

**URL**: `/transactions`

**Method**: `GET`

**Query Parameters**: None

**Success Response**:
- Status Code: `200 OK`
- Response Body: List of sales transactions

**Error Response**:
- Status Code: `500 Internal Server Errort`
- Response Body: Error details


### Calculate Total Producer Balance

Endpoint for calculating the total balance of sales producers.

**URL**: `/transactions/producer/total-balance`

**Method**: `GET`

**Query Parameters**:

- `product`: Filter the calculation for a specific product.

**Success Response**:
- Status Code: `200 OK`
- Response Body: Total balance of sales producers

**Error Response**:
- Status Code: `500 Internal Server Errort`
- Response Body: Error details


### Calculate Total Affiliate Balance

Endpoint for calculating the total balance of sales affiliates.

**URL:** `/transactions/affiliated/total-balance`

**Method:** `GET`

**Query Parameters:**

- `product`: Filter the calculation for a specific product.

**Success Response:**

- Status Code: `200 OK`
- Response Body: Total balance of sales affiliates

**Error Response:**

- Status Code: `500 Internal Server Errort`
- Response Body: Error details


## How to Run the API

1. Make sure you have Node.js installed on your machine.
2. Clone this repository.
3. In the project root directory, run the command `npm install` to install the dependencies.
4. Run the command `npm start` to start the server.
5. Access the API through the URL `http://localhost:3000`.

## How to Run the Tests

1. Make sure you have Node.js installed on your machine.
2. Clone this repository.
3. In the project root directory, run the command `npm install` to install the dependencies.
4. Run the command `npm start` to start the server.
5. Access the API through the URL `http://localhost:3000`.

## Dependencies

This API uses the following dependencies:

- Express: Web framework for Node.js.
- Multer: Middleware for file uploads.
- Other dependencies: Refer to the `package.json` file for the complete list of dependencies.

## Contributing

If you want to contribute to the development of this project, follow the steps below:

1. Fork this repository.
2. Create a branch for your feature (`git checkout -b my-feature`).
3. Make the necessary changes and commit them (`git commit -am 'My new feature'`).
4. Push to the branch (`git push origin my-feature`).
5. Open a Pull Request.