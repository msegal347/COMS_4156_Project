## 💡 Project Description

Welcome to FoodLink, an application that allows organizations to post their available surplus food, and for others to request it. FoodLink's algorithms enable efficient distribution of food, visualization of the delivery route with Google Maps, and a user-friendly interface for both donors and recipients. There is also functionality for third-party auditors to track the transactions and ensure that the food is being distributed correctly.

## 📺 Preview

<img src="https://github.com/msegal347/COMS_4156_Project/blob/ss-fe-readme/frontend/foodlink-frontend/public/readme-assets/1.png" alt="FoodLink" height="500" width="1000">

## 📌 Prerequisites

### 💻 System requirement :

1. Any system with basic configuration.
2. Operating System : Any (Windows / Linux / Mac).

### 💿 Software requirement :

1. Updated browser
2. Node.js installed (If not download it [here](https://nodejs.org/en/download/)).
3. Any text editor of your choice.

## Installation 🔧

### Client

```
$ cd frontend/foodlink-frontend
```

Install NodeJS dependencies

```
$ yarn install
```

or

```
$ npm install
```

Start the NodeJS server

```
$ npm start:frontend
```

or

```
$ yarn start:frontend
```

### Server

Install dependencies

```
$ yarn install
```

or

```
$ npm install
```

Start the server

```
$ yarn start:backend
```

or

```
$ npm start:backend
```

## End-to-End Testing Checklist

### Automated Tests

1. **Dashboard Page Test**

   - [ ] Verify that the dashboard page loads without errors.
   - [ ] Check if recent transactions and pending requests are displayed correctly.
   - [ ] Select a transaction and verify if the map renders with the correct markers and route.

2. **Login Page Test**

   - [ ] Verify that the login page loads without errors.
   - [ ] Enter valid credentials and check if login redirects to the appropriate role-specific page.
   - [ ] Enter invalid credentials and ensure that the appropriate error message is displayed.

3. **Registration Page Test**

   - [ ] Verify that the registration page loads without errors.
   - [ ] Enter valid registration details and check if registration is successful.
   - [ ] Enter invalid or incomplete details and verify the error messages.

4. **Navigation Test**

   - [ ] Check if navigation links are correctly displayed.
   - [ ] Verify that clicking on a navigation link leads to the correct page.
   - [ ] Test the active state of navigation links.

5. **Profile Page Test**

   - [ ] Verify that the profile page loads without errors.
   - [ ] Check if user profile details are displayed.
   - [ ] Edit profile details, submit changes, and verify if changes are saved.

6. **Sink Page Test**
   - [ ] Verify that the sink page loads without errors.
   - [ ] Change the quantity of a material and submit a request.
   - [ ] Ensure that the request is successfully submitted.

### Manual Tests

1. **Cross-Browser Testing**

   - [ ] Manually test your application on different browsers (Chrome, Firefox, Safari, etc.) to ensure cross-browser compatibility.

2. **Responsive Design Testing**

   - [ ] Manually test your application on various devices (desktop, tablet, mobile) to ensure a responsive design.

3. **Accessibility Testing**
   - [ ] Conduct accessibility testing using tools like Lighthouse or axe, ensuring that your application adheres to accessibility standards.

### Running Tests Locally

- Instructions on how to run the automated tests and any prerequisites.

  ```bash
  # Install dependencies
  npm install

  # Run all automated tests
  npm test:e2e
  ```
### General Information

No third party code was used, but we did use the Google Maps API. The documentation can be found here:

This is the documentation for the Geocoding service: 

https://developers.google.com/maps/documentation/javascript/geocoding

This is the documentation for the Routes service:

https://developers.google.com/maps/documentation/routes

The Google Maps API is used on the Dashboard and Audit pages of the application.