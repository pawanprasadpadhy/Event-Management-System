# Event Management System

This project is an Event Management System with a React frontend and an Express.js backend, using MongoDB as the database.

## Prerequisites

Before you begin, ensure you have the following installed:

*   Node.js (LTS version recommended)
*   npm (comes with Node.js)
*   MongoDB (Community Edition recommended, running locally)

### Installing MongoDB on Ubuntu/Debian

Follow these steps to install MongoDB Community Edition on Ubuntu or Debian-based systems:

1.  **Import the MongoDB public GPG Key:**

    ```bash
    sudo apt-get install gnupg curl
    curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-archive-keyring.gpg --dearmor
    ```

2.  **Create a list file for MongoDB:**

    ```bash
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
    ```

3.  **Reload local package database:**

    ```bash
    sudo apt-get update
    ```

4.  **Install the MongoDB packages:**

    ```bash
    sudo apt-get install -y mongodb-org
    ```

5.  **Start MongoDB:**

    ```bash
    sudo systemctl start mongod
    ```

6.  **Verify MongoDB is running:**

    ```bash
    sudo systemctl status mongod
    ```

    You should see `active (running)` in the output.

7.  **Enable MongoDB to start on system boot:**

    ```bash
    sudo systemctl enable mongod
    ```

For other operating systems or detailed instructions, please refer to the official [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/).

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
