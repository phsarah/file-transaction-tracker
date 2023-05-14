# Sales File Transaction Manager

This project consists of two parts: a React application and an API for managing sales file transactions. 
The React application provides a user interface for interacting with the API, while the API handles the business logic and data management.

<p align="center">
  <img src="https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white" alt="React Logo" />
  <img src="https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white" alt="Node.js Logo" />
  <img src="https://img.shields.io/badge/-TypeScript-007ACC?logo=typescript&logoColor=white" alt="TypeScript Logo" />
  <img src="https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white" alt="Express Logo" />
  <img src="https://img.shields.io/badge/-Prisma-1B222D?logo=prisma&logoColor=white" alt="Prisma Logo" />
  <img src="https://img.shields.io/badge/-PostgreSQL-336791?logo=postgresql&logoColor=white" alt="PostgreSQL Logo" />
  <img src="https://img.shields.io/badge/-Jest-C21325?logo=jest&logoColor=white" alt="Jest Logo" />
  <img src="https://img.shields.io/badge/-Axios-FF0000?logo=axios&logoColor=white" alt="Axios Logo" />
</p>

## React Application

The React application is a front-end interface that allows users to upload sales transaction files and view transaction data. It communicates with the API to send requests and receive responses. The application provides the following features:


- File Upload: Users can upload a TXT file containing sales transaction data.
- Transaction Listing: Users can view a list of all sales transactions.
- Producer Balance Calculation: Users can calculate the total balance of sales producers.
- Affiliate Balance Calculation: Users can calculate the total balance of sales affiliates.

To run the React application, follow the instructions in the README file of the react-app directory.


## API

The API is built with Node.js, TypeScript, and Express. It provides the necessary endpoints for managing sales file transactions. The API handles file uploads, stores transaction data in a PostgreSQL database using Prisma ORM, and performs calculations on the transaction data.

The API exposes the following endpoints:

- `/transactions/upload`: Endpoint for uploading a file containing sales transactions.
- `/transactions`: Endpoint for retrieving all sales transactions.
- `/transactions/producer/total-balance`: Endpoint for calculating the total balance of sales producers.
- `/transactions/affiliated/total-balance`:  Endpoint for calculating the total balance of sales affiliates.

To run the API, follow the instructions in the README file of the api directory.

### Postman

https://documenter.getpostman.com/view/13247023/2s93eePUY5

## Contributing

If you want to contribute to the development of this project, follow the steps below:

1. Fork this repository.
2. Create a branch for your feature (`git checkout -b my-feature`).
3. Make the necessary changes and commit them (`git commit -am 'My new feature'`).
4. Push to the branch (`git push origin my-feature`).
5. Open a Pull Request.

License
This project is licensed under the MIT License.

Contact
If you have any questions or suggestions, feel free to reach out to us at sarah.phessel@gmail.com.