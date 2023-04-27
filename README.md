# SHOPPIO Frontend - Reactjs e-commerce website

This project is a responsive and user-friendly e-commerce platform built using React.js, Bootstrap, Material-UI, Axios, Redux, React Router DOM, and many other modern web technologies. This frontend is designed to seamlessly interact with the [backend API](https://github.com/Body661/nodejs-ecommerce-api), providing users with a smooth and enjoyable shopping experience.

## Technologies Used
- React.js - A JavaScript library for building user interfaces
- Bootstrap - A CSS framework for responsive design
- Material-UI - A popular React UI framework
- Axios - A library for making HTTP requests from the browser
- Redux - A state management library for JavaScript applications
- React Router DOM - A collection of navigational components for React applications

## Features
- Responsive design that works on various devices
- User authentication and authorization
- Product browsing, search, and sorting
- Shopping cart and checkout functionality
- User profile and order history management
- Admin dashboard for managing products, categories, and orders

## Directory Structure
The app follows a clear and organized directory structure to ensure maintainability and ease of understanding. The structure is as follows:


* `public` contains the static files and the index.html file.
* `src` contains the main source code for the frontend application:
    * `API` contains axios configurations.
    * `components` contains reusable UI components.
    * `customHooks` contains all reusable custom hooks.
    * `hooks` contains all redux hooks.
    * `images`  contains images, icons, and other static resources.
    * `Page` contains the main views for the application.
    * `redux` contains the Redux store, actions, and reducers.
    * `App.js` is the main application component.
    * `index.js` is the entry point for the frontend application.
## Run Locally

1- Clone the project

```bash
  git clone https://github.com/Body661/e-commerce-frontend.git
```

2- Go to the project directory

```bash
  cd e-commerce-frontend
```

3- Install dependencies

```bash
  npm install
```

4- Set up environment variables

To configure the app with the necessary environment variables, follow these steps:

- Locate the example.env file in the root directory of the project.
- Make a copy of the example.env file and rename it to .env.
- Open the .env file and populate it with the required variables.

5- Start the development server:

```bash
  npm start
```

6- Open your browser and navigate to:

```bash
  http://localhost:3000/
```
## Authors

- [@Abdolrahman Saleh El Hagrasy](https://www.github.com/body661)


## Feedback

If you have any feedback, please reach out to us at elhagrasy@codenetinc.com
