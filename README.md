# MERN Login Module

A full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring Firebase authentication and user data management.

## 🚀 Features

### Authentication
- **Firebase Authentication** with email/password
- **Google Sign-in** integration
- User registration and login
- Password confirmation validation
- Logout functionality

### User Management
- Add user data to MongoDB
- Display all user data
- Delete user records
- Real-time data updates

### UI/UX
- Modern, responsive design with CSS styling
- Remix icons for enhanced visual appeal
- Loading states and error handling
- Conditional rendering based on auth state

## 📁 Project Structure

```
mern/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx    # Firebase Auth Context
│   │   ├── firebase/
│   │   │   └── config.js          # Firebase Configuration
│   │   ├── App.jsx                # Main App Component
│   │   ├── Form.jsx               # Login/Dashboard Component
│   │   ├── Form.css               # Styling
│   │   └── main.jsx               # Entry Point
│   ├── package.json
│   └── vite.config.js
└── server/                 # Node.js Backend
    ├── controller/
    │   └── user.js                # User Controllers
    ├── models/
    │   └── user.js                # MongoDB User Model
    ├── routes/
    │   └── api.js                 # API Routes
    ├── app.js                     # Express Server
    └── package.json
```

## 🛠️ Technologies Used

### Frontend
- **React** 18+ with Vite
- **Firebase** Authentication
- **Remix Icons** for UI icons
- **CSS3** for styling
- **Fetch API** for HTTP requests

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **CORS** enabled
- **JSON** middleware for parsing

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Firebase project with Authentication enabled
- Git

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yadavaman13/login-module.git
cd login-module
```

### 2. Backend Setup
```bash
cd server
npm install
```

**Dependencies installed:**
- express ^5.1.0
- mongoose ^8.16.4
- nodemon ^3.1.10

### 3. Frontend Setup
```bash
cd ../client
npm install
```

**Dependencies installed:**
- react, react-dom
- vite
- @remixicon/react
- firebase

### 4. Environment Configuration

#### MongoDB Connection
Update the MongoDB connection string in `server/app.js`:
```javascript
mongoose.connect("mongodb://127.0.0.1:27017/merntest")
```

#### Firebase Configuration
Update Firebase config in `client/src/firebase/config.js` with your Firebase project credentials.

## 🚀 Running the Application

### Start the Backend Server
```bash
cd server
npm run server
# or
npm start
```
Server runs on: `http://localhost:5000`

### Start the Frontend
```bash
cd client
npm run dev
```
Client runs on: `http://localhost:5174` (or another available port)

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/` | Homepage route |
| POST | `/api/user` | Add new user data |
| GET | `/api/useralldata` | Fetch all user data |
| DELETE | `/api/userdatadelete/:id` | Delete user by ID |

## 🗃️ Database Schema

### User Model (MongoDB)
```javascript
{
  user: String,     // Username
  pass: String,     // Password
  _id: ObjectId     // MongoDB auto-generated ID
}
```

## 🔐 Authentication Flow

1. **Unauthenticated Users**: See login/signup form with Firebase auth
2. **Registration**: Users can create accounts with email/password
3. **Login**: Email/password or Google sign-in
4. **Authenticated Users**: Access to dashboard with data management features
5. **Logout**: Clear authentication state

## 🎨 UI Components

### Login/Signup Form
- Email and password inputs with icons
- Confirm password for registration
- Google sign-in button
- Form validation and error handling

### User Dashboard
- Welcome message with user info
- Profile image (if available from Google)
- Data entry form
- User data display with delete functionality

## 🛡️ Security Features

- Firebase Authentication for secure user management
- Input validation on both client and server
- Error handling and user feedback
- Secure API endpoints

## 📝 Scripts

### Server Scripts
```bash
npm start          # Start server with node
npm run server     # Start server with nodemon (development)
```

### Client Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Aman Yadav**
- GitHub: [@yadavaman13](https://github.com/yadavaman13)
- Email: yadavaman8511005211@gmail.com

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `app.js`

2. **Firebase Import Error**
   - Run `npm install firebase` in client directory
   - Verify Firebase config credentials

3. **Port Already in Use**
   - Client automatically finds available port
   - Server uses port 5000 by default

4. **API Request Failures**
   - Ensure both client and server are running
   - Check proxy configuration in `vite.config.js`

## 🚀 Deployment

### Backend Deployment
- Deploy to platforms like Heroku, Railway, or DigitalOcean
- Set environment variables for MongoDB URI
- Update CORS settings for production domain

### Frontend Deployment
- Build the project: `npm run build`
- Deploy to Netlify, Vercel, or similar platforms
- Update API base URL for production

---

⭐ **Star this repository if you found it helpful!**
