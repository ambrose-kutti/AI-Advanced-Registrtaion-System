# 🚀 Registration UI with PostgreSQL

<div align="center">

<!-- TODO: Add project logo if available -->

[![GitHub stars](https://img.shields.io/github/stars/ambrose-kutti/Registration_UI_with_Postgres?style=for-the-badge)](https://github.com/ambrose-kutti/Registration_UI_with_Postgres/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/ambrose-kutti/Registration_UI_with_Postgres?style=for-the-badge)](https://github.com/ambrose-kutti/Registration_UI_with_Postgres/network)
[![GitHub issues](https://img.shields.io/github/issues/ambrose-kutti/Registration_UI_with_Postgres?style=for-the-badge)](https://github.com/ambrose-kutti/Registration_UI_with_Postgres/issues)
 <!-- TODO: Add actual license file -->

**A secure user registration web application featuring Flask, PostgreSQL, and optional facial recognition using Dlib and OpenCV.**

<!-- TODO: Add live demo link if available -->
</div>

## 📖 Overview

This project is a robust web application designed for user registration and management. It leverages Python's Flask framework for the backend, providing a RESTful API and server-rendered HTML pages. User data, including securely hashed passwords and optional facial embeddings, is stored in a PostgreSQL database. The application demonstrates best practices for handling user authentication, data persistence, and integrates machine learning capabilities for advanced user verification through facial recognition.

## ✨ Features

-   🎯 **User Registration**: Secure form for new user sign-ups with validation.
-   🔐 **User Authentication**: Login system to authenticate registered users.
-   🔒 **Secure Password Hashing**: Utilizes `bcrypt` for robust password storage.
-   👤 **Face Embedding Generation**: Extracts unique facial features using Dlib and OpenCV during registration.
-   🔎 **Face Verification (Optional)**: Supports verifying users based on their stored face embeddings.
-   🐘 **PostgreSQL Integration**: Persistent storage for user data, including personal details and face embeddings.
-   🌐 **Server-Rendered UI**: Classic web application approach with HTML, CSS, and JavaScript delivered by Flask.

## 🖥️ Screenshots

<!-- TODO: Add actual screenshots of the registration form, login page, and any user dashboard. -->
**Step:1:  Registration form**

<img width="1366" height="720" alt="Screenshot 2026-02-07 110014" src="https://github.com/user-attachments/assets/a085999f-491a-4495-bdf1-27a3eaaa89b5" />

**Step:2: Capture the Face angles**

<img width="1366" height="720" alt="Screenshot 2026-02-07 110116" src="https://github.com/user-attachments/assets/e7a70a15-0d51-4f7a-89b3-497ea20c3d11" />
<img width="1366" height="720" alt="Screenshot 2026-02-07 110148" src="https://github.com/user-attachments/assets/188fd538-1974-4cfd-95ca-c9106f1fcf4b" />

**Step:3: Success Text with Embeddings Stored in DB**

<img width="1366" height="720" alt="Screenshot 2026-02-07 110229" src="https://github.com/user-attachments/assets/331dfd80-7b28-477b-9bd7-f4634e79eb3c" />

<!-- ![Login Page](path-to-login-screenshot.png) -->
<!-- ![Dashboard/Profile Page](path-to-dashboard-screenshot.png) -->

## 🛠️ Tech Stack

**Backend:**
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Dlib](https://img.shields.io/badge/Dlib-004B8C?style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB2aWV3Qm94PSIwIDAgMzYgMzYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI%2BPHBhdGggZmlsbD0iI0ZmZiIgZD0iTTE4IDBjLTkuOTQxIDAtMTggOC4wNTktMTggMThzOC4wNTkgMTggMTggMTggMTgtOC4wNTkgMTgtMTgtOC4wNTktMTgtMTgtMTh6TTYuMzIyIDI5LjcwN2EzLjYgMy42IDAgMCAwIDUuMDggMCA3Ljk4MyA3Ljk4MyAwIDAgMSAxMS4wNDUgMCAzLjYgMy42IDAgMCAwIDUuMDg3IDBjLTIuMDI3IDMuMzgyLTYuMDk2IDUuNjctMTAuNiA1LjY3LTEwLjE5MSAwLTE2LjQ3OC02LjUxNS0xNi40NzgtMTguNjI4IDAtNS44OTUgMi41NDUtMTAuOTEzIDYuMzM1LTE0LjkzYTcuOTgyIDcuOTgyIDAgMCAxIDguNzA4IDQuNzk3IDQuNiA0LjYgMCAwIDAgLjQ0MiA1Ljc2IDQuNiA0LjYgMCAwIDAtLjcwOC0xLjAyMiA2LjE2MiA2LjE2MiAwIDAgMC04LjcwOC0zLjY5QzcuNTU1IDguNjc1IDUgMTMuNjA2IDUgMTguMDY2YzAgOC45NDYgNC4zNzcgMTMuMzQgMTAuNjM4IDE1LjM4NCA3LjA5MyA2LjA3IDQuNTcgMi4yODUtLjcyLS42OC01LjQyOC02LjQyNC0xMC41NzYtOS4xNC0xMy4zMzctMjMuMDk0eiIvPjwvc3ZnPg%3D%3D&logoColor=white)
![OpenCV](https://img.shields.io/badge/OpenCV-2962FF?style=for-the-badge&logo=opencv&logoColor=white)
![Flask-WTF](https://img.shields.io/badge/Flask--WTF-gray?style=for-the-badge)
![Bcrypt](https://img.shields.io/badge/Bcrypt-gray?style=for-the-badge)
![Python-Dotenv](https://img.shields.io/badge/Python--Dotenv-gray?style=for-the-badge)

**Frontend:**
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**Database:**
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## 🚀 Quick Start

Follow these steps to get your development environment up and running.

### Prerequisites
-   **Python 3.9+**: Ensure you have a compatible Python version installed.
-   **PostgreSQL**: A running PostgreSQL server instance.
-   **OpenCV Dependencies**: Depending on your OS, you might need additional system libraries for OpenCV.

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ambrose-kutti/Registration_UI_with_Postgres.git
    cd Registration_UI_with_Postgres
    ```

2.  **Create a Python virtual environment and activate it**
    ```bash
    python3 -m venv venv
    source venv/bin/activate # On Windows use `venv\Scripts\activate`
    ```

3.  **Install Python dependencies**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Environment setup**
    Create a `.env` file in the project root by copying `.env.example` (if present) or manually creating it:
    ```bash
    cp .env.example .env # If .env.example exists, otherwise create .env
    ```
    Configure your environment variables in `.env`:

    | Variable               | Description                                   | Default        | Required |
    |------------------------|-----------------------------------------------|----------------|----------|
    | `SECRET_KEY`           | Flask secret key for session management.      | Random string  | Yes      |
    | `DATABASE_URL`         | PostgreSQL connection string.                 | `postgresql://user:password@host:port/database` | Yes |
    | `UPLOAD_FOLDER`        | Path to store uploaded face images temporarily. | `uploads`      | No       |
    | `MAX_CONTENT_LENGTH`   | Max file size for uploads in bytes.           | `16 * 1024 * 1024` (16MB) | No |

    *Example `DATABASE_URL` format:*
    `postgresql://username:password@localhost:5432/registration_db`

5.  **Database setup**
    Connect to your PostgreSQL server and create a database named `registration_db` (or whatever you configured in `DATABASE_URL`).
    ```sql
    CREATE DATABASE registration_db;
    ```
    The application will automatically create the `users` table upon its first run if it doesn't exist, based on the schema defined in `app.py`.

6.  **Start development server**
    ```bash
    flask run
    ```
    If you encounter issues, ensure `FLASK_APP=app.py` is set in your environment (it's often picked up automatically if `app.py` is the only Flask app in the directory).

7.  **Open your browser**
    Visit `http://localhost:5000` (or the port Flask indicates).

## 📁 Project Structure
```
Registration_UI_with_Postgres/
├── .gitignore             # Specifies intentionally untracked files to ignore
├── README.md              # Project README file
├── app.py                 # Main Flask application entry point, defines routes and logic
├── database/              # Directory for database-related scripts
| ├── connection.py
| ├── create_db.py
├── face_embeddings.py     # Module for generating and comparing facial embeddings
├── requirements.txt       # Python dependency list
├── static/                # Static assets (CSS, JavaScript)
|  ├── css/
|   └── style.css          # Main stylesheet
| └── js/
|   └── script.js          # Frontend JavaScript (e.g., for webcam interaction)
├── templates/             # Jinja2 HTML templates for rendered views
|  ├── index.html           # Base template for consistent UI
```

## ⚙️ Configuration

### Environment Variables
The application relies on environment variables for sensitive data and configuration. Please refer to the `.env` file setup in the [Installation](#installation) section.

### Configuration Files
-   `requirements.txt`: Manages Python package dependencies.
-   `.env`: Used to configure sensitive application settings and database connection strings.

## 🔧 Development

### Available Scripts

| Command        | Description                                  |
|----------------|----------------------------------------------|
| `flask run`    | Starts the Flask development server.         |
| `python app.py`| Also starts the Flask application if configured correctly. |

### Development Workflow
1.  Ensure your virtual environment is activated (`source venv/bin/activate`).
2.  Set `FLASK_APP=app.py` if not automatically detected.
3.  Run `flask run`.
4.  Modify Python code in `app.py`, `face_embeddings.py`, or static/templates files. Flask development server typically reloads on code changes.


## 🤝 Contributing

We welcome contributions! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature (`git checkout -b feature/YourFeatureName`).
3.  Implement your changes.
4.  Commit your changes (`git commit -m 'Add Your Feature'`).
5.  Push to the branch (`git push origin feature/YourFeatureName`).
6.  Open a Pull Request.

## 🙏 Acknowledgments

-   **Flask**: The Python microframework for web development.
-   **Psycopg2**: PostgreSQL adapter for Python.
-   **Dlib**: For state-of-the-art machine learning algorithms and facial recognition capabilities.
-   **OpenCV**: For computer vision tasks and image processing.
-   **Bcrypt**: For secure password hashing.
-   **Flask-WTF**: For integrating WTForms with Flask, simplifying form handling.
-   **python-dotenv**: For managing environment variables.

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [ambrose-kutti](https://github.com/ambrose-kutti)

</div>
