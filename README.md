Watch Store Web Application 

Watch store is a secure e-commerce web application built as part of an Information Security assignment. The project allows users to purchase watches while ensuring secure authentication, access control, and protection against OWASP Top 10 vulnerabilities.

Project Overview

Watch store allows users to:

Authenticate using Auth0 (OIDC protocol).

View their profile details: username, name, email, contact number, and country.

Purchase watches with the following details:

Date of purchase (on or after the current date, excluding Sundays)

Preferred delivery time (10 AM, 11 AM, 12 PM)

Preferred delivery location (district list)

Product name (selected from predefined list)

Quantity

Message

View their order history (access controlled; users can only see their own orders).

Technologies Used

Frontend: React.js with Vite, Tailwind CSS

Backend: Express.js

Database: MongoDB (Atlas or local)

Authentication: Auth0 (OpenID Connect - OIDC)

Other: Axios, Helmet, CORS, JWT, Stripe for payments

Security Considerations

The application was designed to address the OWASP Top 10 vulnerabilities:

Injection (SQL/NoSQL):

Used parameterized queries and Mongoose ODM

Broken Authentication:

Authentication delegated to Auth0 using OIDC

Tokens validated on backend before granting access

Sensitive Data Exposure:

Environment variables stored in .env file (excluded from GitHub)

HTTPS used for secure communication

Broken Access Control:

Users can only view and manage their own orders

Backend verifies tokens and user IDs

Cross-Site Scripting (XSS):

React prevents DOM-based XSS by default

Security Misconfiguration & CORS:

Correctly configured CORS and security headers using Helmet

Others:

Regular NPM package updates to avoid known vulnerabilities

Logging of authentication failures

Setup Instructions
Prerequisites

Node.js ≥ 16.x

MongoDB (local or Atlas)

npm

Tomcat (for deployment, optional)

1. Clone Repository
git clone https://github.com/Thagya/security-with-Eco-friendly-product-store.git
cd watch-store

2. Configure Environment Variables

Create .env files for frontend and backend using .env.example as a template.

Backend .env

MONGODB_URI=<Your MongoDB URI>
AUTH0_DOMAIN=dev-xqy8hn0qzevmnbjd.us.auth0.com
AUTH0_CLIENT_ID=csaBewFtIfXLbZF0R59wewLxlvQTH6Ck
AUTH0_CLIENT_SECRET=<Your Auth0 Secret>
JWT_SECRET=<Strong Random Secret>
CORS_ORIGIN=http://localhost:5173


Frontend .env

VITE_AUTH0_DOMAIN=dev-xqy8hn0qzevmnbjd.us.auth0.com
VITE_AUTH0_CLIENT_ID=csaBewFtIfXLbZF0R59wewLxlvQTH6Ck
VITE_API_URL=http://localhost:3001
VITE_AUTH0_AUDIENCE=watch-store-api
PORT=5173


Important: Do not commit .env to GitHub. Use .env.example for reference.

3. Setup MongoDB Database

Start MongoDB locally or use Atlas

Create collections: users, orders, products

Optionally, run database script to insert sample data (database/init.js)

4. Run Backend
cd backend
npm install
npm run dev


Runs on: http://localhost:3001

5. Run Frontend
cd frontend
npm install
npm run dev


Runs on: http://localhost:5173
Authentication & Access Control

Users log in via Auth0 (OIDC)

ID token + access token validated by backend

Protected routes for: /profile, /orders, /purchase

Only authenticated users can access and manage their orders

Challenges Faced

Understanding OIDC authentication and token flow

Implementing strict access control per user

Securely managing secrets and environment variables

Ensuring smooth communication between React frontend and Express backend

Learning Outcomes

Security-first web development practices

Integration of OIDC authentication via Auth0

Implementation of secure APIs with token validation

Managing frontend-backend communication and CORS

Using React, Express, MongoDB in a full-stack secure application
