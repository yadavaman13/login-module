# Login Module with Firebase Authentication

This React application provides authentication functionality using Firebase with Google Sign-In support.

## Features

- **Email/Password Authentication**: Traditional login and signup
- **Google Sign-In**: One-click authentication with Google
- **Firebase Integration**: Secure authentication backend
- **User Management**: Display user profile information
- **Legacy Backend Support**: Maintains compatibility with existing backend

## Firebase Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Follow the setup wizard

### 2. Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Enable "Google" provider
   - Click on Google provider
   - Enable it and add your support email
   - Download the configuration if needed

### 3. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select "Web"
4. Register your app with a nickname
5. Copy the Firebase configuration object

### 4. Configure Environment Variables

1. Open `.env` file in the client directory
2. Replace the placeholder values with your actual Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-actual-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-actual-sender-id
VITE_FIREBASE_APP_ID=your-actual-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-actual-measurement-id
```

## Installation and Setup

### Client Setup

```bash
cd client
npm install
npm run dev
```

### Server Setup

```bash
cd server
npm install
npm run server
```

## Project Structure

```
client/
├── src/
│   ├── components/
│   ├── contexts/
│   │   └── AuthContext.jsx       # Authentication context
│   ├── firebase/
│   │   └── config.js             # Firebase configuration
│   ├── App.jsx                   # Main app component
│   ├── Form.jsx                  # Authentication form
│   └── main.jsx
├── .env                          # Environment variables
└── package.json
```

## Usage

### Authentication Features

1. **Email/Password Login**: Users can sign up and log in with email and password
2. **Google Sign-In**: One-click authentication with Google account
3. **User Profile**: Display user information after authentication
4. **Sign Out**: Secure logout functionality

### Available Authentication Methods

```jsx
import { useAuth } from './contexts/AuthContext';

const { 
  currentUser,      // Current authenticated user
  login,           // Email/password login
  signup,          // Email/password signup
  signInWithGoogle, // Google sign-in
  logout           // Sign out
} = useAuth();
```

## Firebase Security Rules

Make sure to configure appropriate security rules in Firebase Console for production use.

## Environment Variables

All Firebase configuration is stored in environment variables for security. Never commit actual credentials to version control.

## Development

- The app runs on `http://localhost:5173` (Vite default)
- The server runs on `http://localhost:5000`
- Hot reload is enabled for development

## Production Deployment

1. Build the client: `npm run build`
2. Deploy to your preferred hosting service
3. Ensure environment variables are properly configured in production
4. Update Firebase project settings for production domain

## Troubleshooting

- Ensure all environment variables are properly set
- Check Firebase Console for any configuration issues
- Verify that Google Sign-In is properly configured with correct domains
- Check browser console for any authentication errors+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
