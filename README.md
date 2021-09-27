# Transact Example

This application checks recent transactions for suspicious activity.

## Getting Started

Authorization and transaction data for this app is powered by the transact-example API. By default, the application performs authentication via the web API.

The authorization and data web API url is [https://transact-example.herokuapp.com](https://transact-example.herokuapp.com)

To run the API locally, you'll need to download and run [transact-example](https://github.com/DeathstarNovember/transact-server) on [http://localhost:5000](http://localhost:5000) by default.

### Install Dependencies

`yarn`

### Start the app

`yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Scenario

Transact is an application that does one thing. It shows your resent transactions that appear to be unusual or fradulent.

There are some sample data located at `src/data/transactions.ts`.

The sample data is being used to display transactions, but it includes several transactions that are verified to not be fradulent or suspicious.

First, correct the view to display only the correct transactions, with the most recent transactions at the top. Then, connect to the API and use live data for the display.

The API does not require authentication for the request or any headers.

Use query string parameter `username` set to the logged-in user's username to retrieve recent transactions for that user.

Create a component to display when there are no transactions to display.

For development, there are 2 sample users.

### Sample User 1

`user_good`
`password_good`

### Sample User 2

`user_bad`
`password_bad`
