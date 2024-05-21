# Save Space - URL Shortener
visit site: https://savespace-frontend-1.onrender.com/

# URL Shortener with Preview

This project is a URL shortener that provides a quick preview of the destination website before redirecting users to it. It utilizes both backend and frontend technologies to achieve this functionality.

## Features

- Shortens URLs for easy sharing.
- Provides a preview of the destination website with favicon and title.
- Secure authentication and URL management.

## Technologies Used

### Backend
- Node.js with Express.js for server-side logic.
- MongoDB as the database to store shortened URLs and user information.
- Axios for making HTTP requests to fetch website metadata.
- Cheerio for parsing HTML and extracting metadata.
- Bcrypt for hashing user passwords securely.
- JWT for authentication.
- Dotenv for environment variable management.

### Frontend
- React.js for building the user interface.
- React Router for client-side routing.
- Axios for making HTTP requests to the backend.
- React Copy to Clipboard for easy copying of shortened URLs.
- React Simple Typewriter for typewriter animation effects.

## Installation

1. Clone the repository:

2. Create .env and fill out as seen in .env.sample

3. cd backend --> npm i + npm run dev & cd frontend --> npm i + npm run dev
