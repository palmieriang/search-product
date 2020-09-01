# ASOS Customer Care Web Engineering Take Home Test

This is a technical excercise involving both some refactoring of existing code and changes to meet some requirements. The exercise uses a React application which currently has no tests and a does not meet the given requirements.

## Getting Started

This application is bootstrapped from a create-react-app application. To get started with the project, you will first need to run `npm install` (or `yarn`) from the root directory. After it has finished installing the required dependencies, get started by running `npm start` (or `yarn start`) which will start the development server on `localhost:3000`, any updates you make to the code will be hot reloaded without you needing to refresh the page.

The project aims to display product search suggestions given a users search query and will display a product card with more detailed product information when selecting one of the search suggestions.

The project has 2 main components:

- The `Autocomplete` component renders a text input and fetches an array of search suggestions given the users inputted search query, rendering these suggestions as a list below the input.
- The `ProductDetail` component recieves a product ID as a prop and fetches product information for the given ID, rendering the returned product data in a card style.

The fetching logic for both of these components in contained within `utils/api.js` which exports a couple of helper functions for retrieving either search suggestions or product information from an ASOS API. Please note, this API is running in a serverless environment which might take a small amount of time to startup if it has not been accessed in a while. If you are experiencing a slow response time, it should go away after the first request but please reach out if you are experiencing consistent problems with the API.

## The Problem

The project is currently unfinished, requiring some new feature development and some refactoring to the current solution. We would like you to alter the application in order to adhere to the following requirements:

1. When a user has typed a search query, the search suggestions should be shown in a list below the text input.
2. Only show the top 10 suggestions at a time. If more suggestions have been returned by the API, you may assume that only the first 10 should be shown.
3. If the user has not entered a search query, we should not fetch or display any search suggestions.
4. When the user selects a suggestion, the product detail should be fetched and displayed in a card style matching the designs.
5. When the user selects a suggestion, the search suggestions should be removed and the text input should be cleared.
6. The application is not responsive and does not match the designs. Please look at the `/designs` directory and alter the application to be as close to the intended designs as possible. Please note that there are designs for desktop and mobile so your solution should be fully responsive and you should assume `600px` to be the breakpoint between desktop and mobile.
7. Currently, a request for suggestions is fired on every keystroke, this should be made more efficient by debouncing the network request.

You may also notice a number of bad practices being displayed throughout the code, please make corrections where you see fit.

The application only includes 1 test, which is a snapshot test of the `Autocomplete` component! We would like you to write tests to prove your changes work, as well as any other tests that you think are required to demonstrate that the components within the application behave as expected.

The project has been bootstrapped to use Jest as a test runner and Enzyme for testing utilities but feel free to use whatever testing library you are comfortable with (just make sure we can use the command `npm run test`/`yarn test` to run the tests).

Some stretch goals you might want to consider are:

1. Display loading states when the product detail and search suggestions are being fetched.
2. Make sure the application is fully keyboard-accessible.
3. The application currently doesn't account for errors when fetching (response failures, request timeouts etc.), how could this be handled within the application?

## Your Solution

Please feel free to spend as much or as little time as you want on improving the application, typically 2-3 hours is enough. What's important is that you are happy with the work that you produce so you can take more time if you want to. We’re looking for simple, clean, readable code. Please try to avoid over-engineering or gold plating.

We don’t want lots of explanatory comments in the code, but if you run out of time and would still like to refactor something then feel free to add a comment in the relevant place. Likewise, you can comment with any other narrations that are relevant.

Feel free to use the internet to look up anything you need. Once you are done, please reply to the email you received containing this test, attaching a zipped solution that compiles, runs in the latest versions of both chrome and safari, and has passing unit tests (**Please make sure to remove node_modules before zipping your solution as to avoid large email attachments!**).
