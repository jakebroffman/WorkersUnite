# Workers United Event Sharing App

Welcome to the Workers United Event Sharing App! This application allows members of the Workers United labor union to create and organize events, RSVP for events, and collaborate with others by taking on specific roles.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used
- **Frontend:** React.js with Material UI
- **Backend:** Ruby on Rails with Active Record
- **Authentication:** Bcrypt for password protection

## Features
- **User Authentication:** Users can create profiles, log in, and secure their accounts with bcrypt password protection.
- **Event Creation:** Members can organize events by providing event details such as name, date, location, start time, duration, and description.
- **Event Listing:** Users can browse a list of all created events in the database.
- **RSVP Functionality:** Members can RSVP for events, choosing from available roles like "photographer" or "volunteer."
- **Role Creation:** Users can create custom roles with titles, responsibilities, and a paid flag.

## Database Schema
### User
```sql
CREATE TABLE User (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  username VARCHAR(255),
  password VARCHAR(255),
  email VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255)
);

CREATE TABLE Event (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  date DATE,
  location VARCHAR(255),
  start_time TIME,
  duration INTERVAL,
  description TEXT,
  organizer_id INT REFERENCES User(id)
);

CREATE TABLE Role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  responsibilities TEXT,
  paid BOOLEAN
);

CREATE TABLE RSVP (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES User(id),
  event_id INT REFERENCES Event(id),
  role_id INT REFERENCES Role(id),
  comment TEXT
);
```
## Getting Started

- Clone the repository.
- Install dependencies for both the frontend and backend.
- Navigate to the frontend directory
- cd frontend
- npm install
- Navigate to the backend directory
- cd ../backend
- bundle install
- Set up the database
- In the backend directory
- rails db:create
- rails db:migrate

# Start the server for both frontend and backend.

- in the frontend directory
- npm start
- In the backend directory
- rails s

## Usage
- Open the application in your web browser.
- Create a new account or log in if you already have one.
- Organize an event or browse existing events.
- RSVP to events and choose specific roles.



