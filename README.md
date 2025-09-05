Student Management API

This is a RESTful API built with Spring Boot for managing student information. It provides endpoints for creating, retrieving, updating, and deleting student records. The application uses a MySQL database for persistent storage.
Prerequisites

Before running this application, ensure you have the following installed:

    Java 17 or higher

    Maven

    MySQL Database Server

Database Configuration

This project is configured to connect to a MySQL database named student_dbase.
Step 1: Create the Database and User

First, you need to create the database and a dedicated user for the application. You can do this by running the following SQL commands in your MySQL client (e.g., MySQL Shell, DBeaver, or command-line):

CREATE DATABASE student_dbase;
CREATE USER 'springuser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON student_dbase.* TO 'springuser'@'localhost';
FLUSH PRIVILEGES;

Note: The username is springuser and the password is password for this example. You can change these to more secure values if you wish.
Step 2: Configure application.properties

The database connection details are defined in the src/main/resources/application.properties file. Please ensure the settings match your database configuration.

spring.datasource.url=jdbc:mysql://localhost:3306/student_dbase
spring.datasource.username=springuser
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

    spring.datasource.url: The connection URL. localhost:3306 is the default for MySQL.

    spring.datasource.username: The database user.

    spring.datasource.password: The password for the user.

    spring.jpa.hibernate.ddl-auto: This is set to update to automatically create or update the database tables based on your entity classes. This is useful for development but should be set to none for production environments.

Getting Started (Back-end)

Follow these steps to get the project up and running:

    Clone the repository:

    git clone [your-repository-url]
    cd [your-project-directory]

    Configure the database:
    Make sure you have completed the "Database Configuration" steps above.

    Build and run the application:
    Use Maven to build and run the project from the command line:

    ./mvnw spring-boot:run

The application will start on port 8080 (or another port if configured) and you can now interact with the API endpoints.
Front-end Application (React)

This project also includes a React front-end created with Vite. This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

    @vitejs/plugin-react uses Babel for Fast Refresh

    @vitejs/plugin-react-swc uses SWC for Fast Refresh

Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the TS template for information on how to integrate TypeScript and typescript-eslint in your project.
Getting Started (Front-end)

After you have cloned the repo, navigate into the React project directory and install the dependencies.

cd student-ui
npm install
npm install -D tailwindcss postcss autoprefixer
npm run dev

 
