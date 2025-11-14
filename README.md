# Event Management System

This project is an Event Management System with a React frontend and an Express.js backend, using MongoDB as the database.

## Project Setup

Follow these steps to set up and run the project locally:

### 1. Clone the repository

```bash
git clone <repository_url>
cd Event-Management-System
```

### 2. Run the setup script

This script will install all necessary dependencies for both the backend and frontend.

```bash
./setup.sh
```

### 3. Environment Variables

Create a `.env` file in the `backend/` directory with the following content:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/event_management
```

### 4. Run the Backend

```bash
cd backend
npm start
```

### 5. Run the Frontend

```bash
cd frontend
npm start
```

## Technologies Used

- **Frontend**: React
- **Backend**: Express.js
- **Database**: MongoDB
- **State Management**: Zustand
- **Timezone Management**: dayjs
