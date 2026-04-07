# Web Invitation API

Simple backend API for a web invitation app built with Node.js, Express, and MongoDB.

## Features

- User authentication
- Invitation management
- RSVP handling
- Theme management
- Image upload support via Cloudinary

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Cloudinary + Multer

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create your environment file:
   - Copy `.env.example` to `.env`
3. Fill in required environment variables in `.env`:
   - `PORT`
   - `MONGO_URI`
   - `SESSION_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
4. Run the app in development mode:
   ```bash
   npm run dev
   ```

Server runs on: `http://localhost:4502` (or your configured `PORT`).

## API Documentation (Swagger)

- Swagger UI: `http://localhost:4502/api-docs`
- OpenAPI JSON: `http://localhost:4502/api-docs.json`

## API Routes

- `POST /api/auth/*` - authentication endpoints
- `GET|POST|PUT|DELETE /api/invitation/*` - invitation endpoints
- `GET|POST|PUT|DELETE /api/rsvp/*` - RSVP endpoints
- `GET|POST|PUT|DELETE /api/themes/*` - theme endpoints

## Author

Leoncio espiritu
