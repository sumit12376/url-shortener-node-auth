# URL Shortener API

This is a backend service that allows you to generate short URLs from long ones and track usage stats.

## Tech Stack
- Node.js
- Express.js
- MongoDB (via Mongoose)
- shortid
- validator
- dotenv

---

## Features

- Create short URLs with optional custom short codes.
- Redirect from short URL to the original URL.
- Get statistics (click count) for any short URL.

---

## Setup Instructions

###  Without Docker

1. Clone the repository:
```bash
https://github.com/sumit12376/url-shortener-node-auth.git
```

2. Install Dependencies:
```bash 
npm install
```

3. Create .env File
```bash
PORT=3000
MONGODB_URI=mongodb+srv://<your-mongo-cluster>
BASE_URL=http://localhost:3000
```

4. Start the Server
npm start

## API Endpoints & Usage

1. Register a New User (http://localhost:3000/auth/register)
```bash 
{
  "email": "sumitvikramsingh36@gmail.com",
  "password": "sumit123"
}
```

2. Login and Get Token (http://localhost:3000/auth/login)
```bash 
{
  "email": "sumitvikramsingh36@gmail.com",
  "password": "sumit123"
}
```
Expected:

```bash 
{
  "token": "your-jwt-token"
}
```

3. Create a Short URL (POST http://localhost:3000/api/shorten)

Headers:

```bash 
Authorization: Bearer <your-jwt-token>
```

```bash 
{
  "url": "https://sumitvikram.netlify.app/",
  "customCode": "sumit"
}
```

Sample Response

```bash 
{
  "originalUrl": "https://sumitvikram.netlify.app/",
  "shortUrl": "http://localhost:3000/r/sumit"
}
```
4. Get Click Statistics (GET http://localhost:3000/api/stats/sumit)

Headers:

```bash 
Authorization: Bearer <your-jwt-token>
```

Sample Response

```bash 
{
  "originalUrl": "https://sumitvikram.netlify.app/",
  "shortUrl": "http://localhost:3000/r/sumit",
  "clicks": 1
}
```

5. Rate Limiting Test

```bash 
{
  "message": "Too many requests, try again later"
}
```

7. Deployment Link: 

```bash 
https://url-shortener-node-auth-2.onrender.com/
```
****
