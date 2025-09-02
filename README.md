# 📅 30-Minute Slot Booking Web Application

A modern slot booking application built with React.js frontend, Node.js/Express backend, and Firestore database. Users can select dates and book 30-minute appointment slots between 9:00 AM and 5:00 PM.

## ✨ Features

- **Calendar Interface**: Easy date selection with a modern date picker
- **Real-time Slot Management**: 16 slots per day (30-minute intervals from 9:00 AM to 5:00 PM)
- **Double Booking Prevention**: Prevents multiple users from booking the same slot
- **User-friendly UI**: Modern, responsive design with smooth animations
- **Email-based Booking**: Users can view their bookings by email address
- **Success Notifications**: Toast notifications for booking confirmations
- **Past Date Filtering**: Prevents booking slots in the past
- **ES6+ Modern JavaScript**: Full ES6 modules, arrow functions, destructuring, and modern syntax

## 🛠️ Tech Stack

### Frontend

- **React.js** - Modern UI framework with hooks
- **ES6+ Features** - Arrow functions, destructuring, modules, useCallback
- **Axios** - HTTP client for API calls with interceptors
- **React DatePicker** - Date selection component
- **React Toastify** - Toast notifications
- **Moment.js** - Date/time manipulation
- **CSS3** - Modern styling with gradients and animations

### Backend

- **Node.js** - JavaScript runtime with ES6 modules
- **Express.js** - Web framework
- **Firebase Admin SDK** - Firestore database integration
- **CORS** - Cross-origin resource sharing
- **Moment.js** - Date/time utilities
- **ES6 Modules** - Import/export syntax

### Database

- **Firestore** - NoSQL cloud database

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase project with Firestore enabled

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 2. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Go to Project Settings > Service Accounts
4. Generate a new private key
5. Download the JSON file and save it as `server/config/firebase-service-account.json`

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
```

### 4. Start the Application

```bash
# Start both frontend and backend (development)
npm run dev

# Or start them separately:
# Backend only
npm run server

# Frontend only (in another terminal)
npm run client
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📋 API Endpoints

### GET `/api/slots/:date`

Get available slots for a specific date

- **Parameters**: `date` (YYYY-MM-DD format)
- **Response**: Array of slots with availability status

### POST `/api/book`

Book a slot

- **Body**: `{ date, time, userEmail }`
- **Response**: Booking confirmation

### GET `/api/bookings/:userEmail`

Get all bookings for a user

- **Parameters**: `userEmail`
- **Response**: Array of user's bookings

### GET `/api/health`

Health check endpoint

- **Response**: API status with timestamp and version

## 🎯 Usage Guide

1. **Enter Email**: Start by entering your email address
2. **Select Date**: Choose a date from the calendar (past dates are disabled)
3. **View Slots**: Available slots will be displayed in a grid
4. **Book Slot**: Click on an available slot to book it
5. **View Bookings**: Use the "Show My Bookings" button to see your existing bookings

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Gradient Background**: Beautiful purple gradient theme
- **Card-based Layout**: Clean, organized interface
- **Hover Effects**: Interactive elements with smooth animations
- **Color-coded Slots**: Green for available, red for booked
- **Toast Notifications**: Success and error messages

## 🔒 Security Features

- **Input Validation**: Server-side validation for all inputs
- **Double Booking Prevention**: Database-level constraints
- **Email Validation**: Basic email format validation
- **Date Filtering**: Prevents booking past dates
- **Error Handling**: Comprehensive error handling middleware

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🏗️ Code Architecture

### Frontend Structure

```
client/src/
├── components/          # React components
├── hooks/              # Custom React hooks
│   └── useSlotBooking.js
├── services/           # API services
│   └── api.js
├── utils/              # Utility functions
│   └── dateUtils.js
├── App.js              # Main application component
└── index.js            # Application entry point
```

### Backend Structure

```
server/
├── utils/              # Utility functions
│   └── validation.js
├── index.js            # Main server file
└── /config/firebase-service-account.json
```

### ES6+ Features Used

- **ES6 Modules**: Import/export syntax
- **Arrow Functions**: Concise function syntax
- **Destructuring**: Object and array destructuring
- **Template Literals**: String interpolation
- **Spread/Rest Operators**: Array and object manipulation
- **useCallback**: React performance optimization
- **Async/Await**: Modern asynchronous programming
- **Optional Chaining**: Safe property access

## 🚀 Deployment

### Backend Deployment

1. Set up environment variables
2. Upload Firebase service account JSON
3. Deploy to your preferred platform (Heroku, Vercel, etc.)

### Frontend Deployment

1. Build the application: `npm run build`
2. Deploy the `build` folder to your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the console for error messages
2. Verify your Firebase configuration
3. Ensure all dependencies are installed
4. Check that both frontend and backend are running

---

**Note**: Make sure to replace the Firebase service account configuration with your actual credentials before running the application.
