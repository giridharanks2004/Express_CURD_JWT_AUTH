👤 Users CRUD API
A simple yet secure RESTful API built using Node.js and Express.js, featuring JWT-based authentication and full CRUD operations for user management.
Designed as a foundational backend project to understand API structure, authentication flow, and secure route handling.

🚀 Features
🔐 Authentication
User login and registration using JWT tokens.

Tokens stored securely in cookies for session persistence.

Middleware-based route protection for authorized access only.

⚙️ CRUD Operations
Create new users.

Retrieve all users or filter by username using query parameters.

Update user details (partial or full).

Delete users by ID.

| Layer          | Technology                            |
| -------------- | ------------------------------------- |
| Backend        | Node.js, Express.js                   |
| Authentication | JWT (jsonwebtoken)                    |
| Validation     | express-validator                     |
| Storage        | In-memory JSON / MongoDB (extendable) |
| Others         | dotenv, cookie-parser                 |




| Method | Endpoint         | Description                         | Access    |
| ------ | ---------------- | ----------------------------------- | --------- |
| POST   | `/api/register`  | Register a new user                 | Public    |
| POST   | `/api/login`     | Login and receive JWT token         | Public    |
| GET    | `/api/users`     | Get all users                       | Protected |
| GET    | `/api/users/id`  | Get user details by id              | Protected |
| PATCH  | `/api/users/:id` | Update user details                 | Protected |
| DELETE | `/api/users/:id` | Delete a user                       | Protected |

🧠 Key Concepts Practiced
Implementing JWT authentication manually using jsonwebtoken.
Securing routes with middleware (authUser).
Performing CRUD operations with clean route-controller separation.
Returning user-friendly messages and proper HTTP codes.
Using cookies to persist JWT tokens.


🧾 Example JWT Flow
User logs in with credentials.
Server verifies and issues JWT token.
Token is stored in browser cookie (auth).
Protected routes check the token before allowing access.

Author:
Giridharan Kandasamy
📚 Final-year Engineering Student | 💻 Aspiring Backend Developer

