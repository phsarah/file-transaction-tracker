## Sales File Transaction Manager

This project is a Sales File Transaction Manager built with React. It allows you to upload sales transfer files in TXT format, view the list of transactions, and display the producers and affiliates for each product along with their final balances.

## Getting Started

To get started with the Sales File Transaction Manager, follow the steps below:

1. Clone the repository:

```bash

git clone <git@github.com:phsarah/sales-file-transaction-manager.git>

```

2. Install the dependencies:


```bash

npm install

```

3. Start the development server:

```bash

npm start

```

This will run the application in development mode. Open [http://localhost:3000](http://localhost:3000) in your browser to view it.

## Uploading Sales Transfer Files

To upload sales transfer files, follow these steps:

1. Click on the "Upload File" button.
2. Select the TXT file containing the sales transfers.
3. Click on the "Submit" button to upload the file.

Once the file is uploaded, the Sales File Transaction Manager will process it and display the list of transactions.

## List of Transactions

The Sales File Transaction Manager will present a table with the following information for each transaction:

- Transaction type ID
- Product Name
- Seller Name
- Transfer Amount

## Producer and Affiliate Balances

For each product, the Sales File Transaction Manager calculates and displays the final balances for the producers and affiliates associated with that product. The balances are updated based on the sales transfer transactions.

## Additional Features

The Sales File Transaction Manager offers the following additional features:

- Testing: You can run tests using the `npm test` command. This launches the test runner in interactive watch mode.
- Building for Production: Use the `npm run build` command to build the application for production. The optimized and minified files will be generated in the `build` folder.

## Learn More

To learn more about Create React App and React, check out the following resources:

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)

Feel free to explore the code and customize the Sales File Transaction Manager according to your needs. Happy coding!


