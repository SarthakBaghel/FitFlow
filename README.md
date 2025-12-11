# 🏋️ Workout Planner

A full-stack web application for generating personalized workout plans. Built with **React** (frontend) and **Node.js/Express** (backend), powered by MongoDB for data persistence.

## 🎯 Features

- **User Authentication**: Secure signup/login with JWT tokens
- **Workout Generation**: Filter and fetch exercises by muscle group, difficulty, and type
- **Plan Management**: Create, view, update, and delete personalized workout plans
- **User Profiles**: Manage user preferences and saved workout plans
- **Responsive Design**: Modern UI with Tailwind CSS

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local or cloud) - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for free tier
- **npm** (comes with Node.js)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/fitness-planner.git
cd fitness-planner
```

### 2. Backend Setup

#### Install Dependencies

```bash
cd backend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `backend` folder with the following variables:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/fitflowdb
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.example.mongodb.net/fitflowdb?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=1h

# External API
X_API_KEY=your_api_ninjas_key_here
```

**Important Security Notes:**
- **JWT_SECRET**: Use a strong, random string (minimum 32 characters). Generate one with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- **MONGO_URI**: If using MongoDB locally, ensure MongoDB is running. For production, use MongoDB Atlas
- **X_API_KEY**: Get your free API key from [API Ninjas](https://api-ninjas.com/api/exercises)

#### Start the Backend Server

```bash
npm start
# or for development with auto-reload:
# npm install -g nodemon
# nodemon server.js
```

The backend will start on `http://localhost:8000`

### 3. Frontend Setup

#### Install Dependencies

```bash
cd frontend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `frontend` folder:

```env
VITE_API_URL=http://localhost:8000
```

#### Start the Frontend Dev Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or next available port)

## 📁 Project Structure

```
Workout Planner/
├── backend/
│   ├── models/           # MongoDB schemas (User, Plan)
│   ├── routes/           # API route handlers
│   ├── middleware/       # Authentication middleware
│   ├── utils/            # Helper functions (password hashing, JWT)
│   ├── server.js         # Express server entry point
│   ├── package.json      # Backend dependencies
│   ├── requirements.txt   # Dependencies reference
│   └── .env              # Environment variables (not in git)
│
└── frontend/
    ├── src/
    │   ├── pages/        # Page components
    │   ├── components/   # Reusable UI components
    │   ├── services/     # API service layer
    │   ├── hooks/        # Custom React hooks
    │   ├── App.jsx       # Root component
    │   └── main.jsx      # React entry point
    ├── package.json      # Frontend dependencies
    ├── vite.config.js    # Vite configuration
    └── .env              # Environment variables (not in git)
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Login and receive JWT token

### User Profile
- `GET /api/user/me` - Get current user profile (protected)
- `PUT /api/user/preferences` - Update user preferences (protected)

### Workout Plans
- `POST /api/plans` - Create a new workout plan (protected)
- `GET /api/plans` - Get all user's plans (protected)
- `GET /api/plans/:id` - Get a specific plan (protected)
- `PATCH /api/plans/:id` - Update a plan (protected)
- `DELETE /api/plans/:id` - Delete a plan (protected)

### Workouts
- `GET /api/workouts?muscle=chest&difficulty=beginner&type=strength` - Fetch exercises with filters

## 🔐 Authentication Flow

1. **Register/Login**: User provides credentials, receives a JWT token
2. **Token Storage**: Token is stored in `localStorage`
3. **Protected Routes**: Frontend routes like `/workouts` require authentication
4. **API Requests**: Backend middleware validates JWT in `Authorization: Bearer <token>` header

## ⚙️ Environment Variables Reference

### Backend (`.env`)
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `8000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/fitflowdb` |
| `JWT_SECRET` | Secret key for signing tokens | `your_random_secret_key` |
| `JWT_EXPIRES_IN` | Token expiration time | `1h` |
| `X_API_KEY` | API Ninjas exercise API key | `your_api_key_here` |

### Frontend (`.env`)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000` |

## 🛠️ Development

### Backend
- Framework: Express.js
- Database: MongoDB with Mongoose ODM
- Authentication: JWT
- Password Hashing: bcrypt
- Validation: express-validator

### Frontend
- Framework: React 18+
- Build Tool: Vite
- Styling: Tailwind CSS
- HTTP Client: Axios
- Routing: React Router v6

## 🚨 Known Limitations

- **API Ninjas Free Tier**: The exercises endpoint is restricted for free-tier accounts. To use:
  - Upgrade to a paid API Ninjas plan, OR
  - Switch to a different free API (e.g., Wger), OR
  - Use a local fallback dataset

## 🐛 Troubleshooting

### Backend won't start
- Ensure MongoDB is running: `mongod`
- Check if port 8000 is already in use: `lsof -i :8000`
- Verify `.env` file exists and has required variables

### Frontend can't connect to backend
- Ensure backend is running on `http://localhost:8000`
- Check that `VITE_API_URL` in frontend `.env` matches backend URL
- Check browser console for CORS errors

### Login/Signup fails
- Verify MongoDB connection is working
- Check that `JWT_SECRET` is set in backend `.env`
- Ensure user hasn't already registered with that email

## 📦 Dependencies

See `backend/requirements.txt` for complete backend dependencies.

Frontend dependencies are in `frontend/package.json`

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add new feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Sarthak Baghel**

## 📞 Support

For issues and questions, please open an issue on GitHub or contact the maintainers.

---

**Happy Training! 💪**
