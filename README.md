# Twitter App

A full-stack Twitter-like application with user management, posts, and MongoDB integration.

## Backend services

The backend contains separate `UserService` and `ContentService` npm
workspaces. Install from `backend` with `npm install`, then start the services
in separate terminals with `npm run dev:user` and `npm run dev:content`.
Run both TypeScript checks with `npm run typecheck`.

Configure `MONGODB_URI` in `backend/.env`. UserService listens on port `3001`
by default; ContentService listens on port `3002`. Configure the ContentService
RPC target using `USER_SERVICE_HOST` and `USER_SERVICE_PORT` when needed.

ContentService validates post authors through the Jayson JSON-RPC method
`users.getById`, served by UserService at `/rpc`. The shared client factory and
RPC wrappers are in `backend/libs`.

Post endpoints are `POST /api/posts`, `GET /api/posts`,
`GET /api/posts/:postId`, `PATCH /api/posts/:postId`, and
`DELETE /api/posts/:postId`.
