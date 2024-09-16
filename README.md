## Scheduling App

A React application designed to manage clients and sites, providing an interface to view detailed information about each site and its associated contacts. This app demonstrates the use of React, TypeScript, React Router, and state management, along with testing using Jest and React Testing Library.


## Introduction
The Scheduling App is a front-end application that allows users to view a list of sites and detailed information about each site, including address and contact details. The application fetches data from a provided API and displays it in a user-friendly interface.


## Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js (version 14 or above)
npm (version 6 or above)


## Installation
Clone the repository:

-git clone https://github.com/salazar00040/scheduling-app.git

-cd scheduling-app

## Install the dependencies:

npm install


## Running the Application
npm start

it will run on http://localhost:3000

## API Usage
The application fetches data from the following API:

Base URL: https://tracktik-challenge.staffr.com
Endpoints:

GET /sites: Retrieves a list of all sites.
GET /sites/:id: Retrieves detailed information about a specific site.

Data Fetching: The application uses the fetchSiteDetails function to retrieve site details based on the id parameter.
Error Handling: Errors during data fetching are caught and logged to the console; an error message is displayed to the user.

## Running Tests

npm test