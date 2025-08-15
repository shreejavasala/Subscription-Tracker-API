# 📊 Subscription Tracker API

A **production-ready Subscription Management System API** built with **Node.js**, **Express.js**, and **MongoDB**.  
This API helps you manage user subscriptions, send automated reminders, and handle authentication securely.

---

## ⚙️ Tech Stack

| Technology     | Purpose |
|---------------|---------|
| **Node.js**   | Backend runtime environment |
| **Express.js**| Web application framework |
| **MongoDB**   | NoSQL database for data persistence |
| **Mongoose**  | MongoDB object modeling for Node.js |
| **JWT**       | Secure authentication mechanism |
| **bcryptjs**       | Password hashing for secure credential storage |
| **Arcjet**    | Advanced rate-limiting and bot protection |
| **Upstash**   | Email reminders and workflow automation |
| **HTTPie**    | Command-line HTTP client for API testing |

---

## 🚀 Features

- **👉 Advanced Rate Limiting & Bot Protection** — Secured with **Arcjet** to prevent abuse.
- **👉 Database Modeling** — Well-structured models & relationships using **Mongoose**.
- **👉 JWT Authentication** — User login, registration, and secure route protection.
- **👉 Subscription Management** — Create, update, and delete subscriptions with ease.
- **👉 Global Error Handling** — Consistent error responses and validation middleware.
- **👉 Logging Mechanism** — Centralized logging for debugging & monitoring.
- **👉 Email Reminders** — Automated workflow for sending reminders using **Upstash**.

---

## 📂 Project Structure

```plaintext
subscription-tracker-api/
│
├── 📁 config/             # Configuration files (e.g., arcjet, upstash, nodemailer)
│   └── arcjet.js
│
├── 📁 controllers/        # Business logic for routes (eg: subscriptionController.js, userController.js, AuthController.js, workflowController.js)
│   └── subscriptionController.js
│
├── 📁 models/             # Mongoose schemas and models (eg: User.model.js, Subscription.model.js)
│   └── Subscription.js
│
├── 📁 routes/             # API route definitions (eg: Subscription.routes.js, User.routes.js, Auth.routes.js, Workflow.routes.js)
│   └── subscriptionRoutes.js
│
├── 📁 utils/              # Utility/helper functions (eg: email-template.js, send-email.js)
│   └── email-template.js
│
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
├── app.js              # App entry point
└── README.md              # Documentation

```

## 🚀 Auth endpoints


| Method | Endpoint    | Description             | Auth Required |
| ------ | ----------- | ----------------------- | ------------- |
| `POST` | `/sign-up`  | Register a new user     | ❌ No          |
| `POST` | `/sign-in`  | Authenticate user login | ❌ No          |
| `POST` | `/sign-out` | Logout the user         | ❌ No          |

---

## 🚀 Subscription endpoints


| Method   | Endpoint             | Description                           | Auth Required |
| -------- | -------------------- | ------------------------------------- | ------------- |
| `GET`    | `/`                  | Get all subscriptions                 | ❌ No          |
| `GET`    | `/:id`               | Get subscription details by ID        | ❌ No          |
| `POST`   | `/`                  | Create a new subscription             | ✅ Yes         |
| `PUT`    | `/:id`               | Update a subscription by ID           | ✅ Yes         |
| `DELETE` | `/:id`               | Delete a subscription by ID           | ✅ Yes         |
| `GET`    | `/user/:id`          | Get subscriptions for a specific user | ✅ Yes         |
| `PUT`    | `/:id/cancel`        | Cancel a subscription                 | ❌ No (demo)   |
| `GET`    | `/upcoming-renewals` | Get upcoming subscription renewals    | ❌ No (demo)   |

---

## 🚀 User endpoints


| Method | Endpoint | Description                                 | Auth Required |
| ------ | -------- | ------------------------------------------- | ------------- |
| `GET`  | `/`      | Get all users                               | ❌ No          |
| `GET`  | `/:id`   | Get a single user by ID                     | ✅ Yes         |
| `PUT`  | `/:id`   | Update user details                         | ✅ Yes         |
| `DELETE`  | `/:id`   | Delete a user by ID  | ✅ Yes         |

---

## 🚀 Workflow endpoints


| Method | Endpoint                 | Description                 | Auth Required |
| ------ | ------------------------ | --------------------------- | ------------- |
| `POST` | `/subscription/reminder` | Send subscription reminders | ❌ No          |

---
**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

  
**Cloning the Repository**

```bash
git clone https://github.com/adrianhajdin/subscription-tracker-api.git
cd subscription-tracker-api
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```


**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
# PORT
PORT=5500
SERVER_URL="http://localhost:5500"

# ENVIRONMENT
NODE_ENV=development

# DATABASE
DB_URI=

# JWT AUTH
JWT_SECRET=
JWT_EXPIRES_IN="1d"

# ARCJET
ARCJET_KEY=
ARCJET_ENV="development"

# UPSTASH
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=

# NODEMAILER
EMAIL_PASSWORD=
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser or any HTTP client to test the project.





