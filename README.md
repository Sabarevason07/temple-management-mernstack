# Temple Management System

## Introduction

The Temple Management System is a comprehensive application developed using the MERN stack (MongoDB, Express.js, React, Node.js). This system aims to streamline and modernize temple management activities, allowing devotees to book priests and poojas in advance. The application enhances the overall experience of devotees by providing a user-friendly interface and efficient management tools for temple authorities.

## Features

- **User Authentication:**
  - Sign up and login for devotees.
  - Admin login for temple authorities.

- **Booking System:**
  - Book priests for personal poojas.
  - Schedule pooja timings and types.
  - Receive booking confirmations via email.

- **Temple Events Management:**
  - View upcoming temple events.
  - Register for events.
  - Receive notifications about events.

- **Donation Management:**
  - Make donations online.
  - Track donation history.
  - Receive receipts for donations.

- **Feedback System:**
  - Provide feedback on services.
  - View feedback history.

- **Admin Dashboard:**
  - Manage priests and pooja schedules.
  - Approve or reject bookings.
  - Monitor temple events.
  - View donation statistics.
  - Manage user feedback.

## Technologies Used

- **Frontend:**
  - React.js
  - Redux (for state management)
  - React Router (for navigation)
  - Axios (for API calls)
  - Bootstrap (for responsive design)

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (database)
  - Mongoose (for MongoDB object modeling)
  - JWT (for authentication)

## Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/temple-management-system.git
   cd temple-management-system
   ```

2. **Backend Setup:**
   - Navigate to the backend directory:
     ```sh
     cd backend
     ```
   - Install backend dependencies:
     ```sh
     npm install
     ```
   - Create a `.env` file and add the following environment variables:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```
   - Start the backend server:
     ```sh
     npm start
     ```

3. **Frontend Setup:**
   - Navigate to the frontend directory:
     ```sh
     cd ../frontend
     ```
   - Install frontend dependencies:
     ```sh
     npm install
     ```
   - Start the frontend server:
     ```sh
     npm start
     ```

4. **Access the Application:**
   - Open your browser and navigate to `http://localhost:3000`

## Usage

- **Devotee:**
  - Sign up or log in.
  - Browse available priests and poojas.
  - Make bookings and receive confirmation.
  - Participate in temple events.
  - Make donations and track history.
  - Provide feedback on services.

- **Admin:**
  - Log in to the admin dashboard.
  - Manage priests and pooja schedules.
  - Approve or reject bookings.
  - Organize and monitor temple events.
  - View and manage donations.
  - Review and respond to user feedback.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any inquiries or feedback, please contact us at support@templemanagement.com.

---

Happy Devoting!
