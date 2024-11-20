# ESD MiniProject

## Project Overview

This project is a mini project for the ESD (Enterprise Software Development) course. It involves both backend and frontend development to create a complete application.

## Backend Documentation

### Technologies Used

- **Java**: The primary programming language used for backend development.

- **Spring Boot**: A framework to build and run the backend application.

- **MySQL**: The database used to store application data.

- **Hibernate**: ORM tool for database operations.

- **Gradle**: Dependency management and build tool.

### Backend Setup Instructions

1. **Clone the repository**:

    ```sh
    git clone git@github.com:deepanshpandey/ESD_MiniProject.git
    ```

2. **Navigate to the project directory**:

    ```sh
    cd ESD-MT2024038
    ```

3. **Configure the database**:

    Update the `application.properties` file with your MySQL database credentials.

4. **Build the project**:

    ```sh
    ./gradlew build
    ```

5. **Run the application**:

    ```sh
    ./gradlew bootRun
    ```

### API Endpoints

- **GET /api/resource**: Fetches all resources.

- **POST /api/resource**: Creates a new resource.

- **PUT /api/resource/{id}**: Updates an existing resource.

- **DELETE /api/resource/{id}**: Deletes a resource.

### Directory Structure

- `src/main/java`: Contains the Java source files.

- `src/main/resources`: Contains configuration files.

- `src/test/java`: Contains test files.

## Frontend Documentation

### Technologies Used

- **React**: The primary library used for building the user interface.

- **Redux**: State management library.

- **Axios**: HTTP client for making API requests.

- **Bootstrap**: CSS framework for styling.

### Frontend Setup Instructions

1. **Navigate to the frontend directory**:

    ```sh
    cd frontend
    ```

2. **Install dependencies**:

    ```sh
    npm install
    ```

3. **Start the development server**:

    ```sh
    npm start
    ```

### Key Components

- **App.js**: The main component that includes routing.

- **Header.js**: The header component.

- **Footer.js**: The footer component.

- **ResourceList.js**: Component to display a list of resources.

- **ResourceForm.js**: Component to create or edit a resource.

- **HomePage.js**: Component for the home page.

- **AboutPage.js**: Component for the about page.

### Redux Structure

- **Actions**: Define the actions that can be dispatched.

- **Reducers**: Define how the application's state changes in response to actions.

- **Store**: Holds the application's state.

## Contributing

1. Fork the repository.

2. Create a new branch (`git checkout -b feature-branch`).

3. Make your changes.

4. Commit your changes (`git commit -m 'Add some feature'`).

5. Push to the branch (`git push origin feature-branch`).

6. Open a pull request.
