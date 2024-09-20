# UniversalHealthRecordsSystem
Universal Health Records System is a web platform for securely managing medical records. Users can upload, view, and delete documents with real-time tracking. Featuring a responsive dashboard with animations, it offers efficient access to health data.
Key Features:
**User Authentication:**

Secure login and registration system with a MySQL database for storing user credentials.
Document Upload & Management:

Allows users to upload, view, and manage medical records/documents.
Displays timestamps (date and time) for uploaded documents.
Users can delete uploaded documents through a simple UI.
Real-time Health Data:

Displays real-time updates of uploaded documents and medical records.
Responsive and **Modern UI**:

Clean, responsive design using plain **HTML and CSS.**
Includes smooth animations and transitions to enhance the user experience.
**Notifications and Reminders:**

The system includes functionality for reminding users of upcoming medical tasks or appointments.
Technologies Used:
**Frontend**:

HTML: Basic structure and layout for the web pages.
CSS: Styling the web pages, including animations and responsive design.
JavaScript: For form validations, interactive elements.
**Backend:**

Node.js: For server-side logic, handling HTTP requests, and managing file uploads.
Express.js: Used to create backend routes and APIs for handling requests.
Multer: Middleware for handling file uploads.
**Database:**

MySQL: To store user information and uploaded documents in a relational database.
PHPMyAdmin: Used to manage and administer the MySQL database.
**Security:**

Password Encryption: Ensures that user credentials are securely handled.
Version Control and Deployment:

Setup Instructions
**Prerequisites:**

Ensure Node.js and npm are installed.
Set up MySQL and PHPMyAdmin for database management.
**Installation:**

**Clone the repository.**
Run npm install to install all required dependencies.
Update the MySQL database credentials in server.js to connect to your database.
Run the server with npm start or node server.js.
**Database Setup:**

**Set up a MySQL database.**
Use SQL scripts provided to create necessary tables for storing user data and documents.
Running the Project:

**Folder Structure** 
**public/**: Contains static assets like CSS files and images.
**uploads/**: Folder for storing uploaded user documents.
**views/**: HTML files such as login.html, register.html, and dashboard.html.
**server.js**: Main server script for handling backend logic and file uploads.
