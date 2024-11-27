# TaskList Application

Welcome to **TaskList**, a simple task management application with a multi-container Docker setup.

---

## Setup Instructions

### Prerequisites
1. [Docker](https://www.docker.com/) installed on your system.
2. Ensure `docker-compose` is available.

### Environment Configuration
Create `.env` files for both the backend and frontend services:

#### Backend (`backend/.env`)
```env
APP_NAME=TaskList
APP_ENV=local
APP_KEY=base64:APP_KEY_HERE
APP_DEBUG=true
APP_URL=http://localhost:9001

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=root
```
#### Frontend (frontend/.env.local)

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:9001/api
```

### Starting the Application

#### Clone the repository:

```
git clone https://github.com/infinitypaul/tasklist.git
cd tasklist
```

#### Start the Docker containers:

```
docker-compose up --build
```

After the containers are running, access the services:

Frontend: http://localhost:3000
Backend: http://localhost:9001

## API Endpoints

### Authentication

| Method | Endpoint       | Description            | Payload                                                  |
|--------|----------------|------------------------|----------------------------------------------------------|
| POST   | `/api/register` | Register a new user   | `{ name, username, email, password, password_confirmation }` |
| POST   | `/api/login`    | Login an existing user | `{ email, password }`                                    |
| POST   | `/api/logout`   | Logout a user         | None                                                     |
| GET    | `/api/me`       | Get user profile      | None                                                     |

## Tasks API Endpoints

| Method | Endpoint                | Description                        | Payload                      |
|--------|--------------------------|------------------------------------|------------------------------|
| GET    | `/api/tasks`            | Get all tasks for the user         | None                         |
| POST   | `/api/tasks`            | Create a new task                  | `{ name, description }`      |
| GET    | `/api/tasks/{id}`       | Get details of a specific task     | None                         |
| PUT    | `/api/tasks/{id}`       | Update a task                      | `{ name, description }`      |
| POST   | `/api/tasks/mark/{id}`  | Toggle task completion status      | None                         |

## Shared Tasks

| Method | Endpoint                   | Description                          | Payload                      |
|--------|-----------------------------|--------------------------------------|------------------------------|
| GET    | `/api/tasks/shared`         | Get tasks shared with the user       | None                         |
| POST   | `/api/tasks/share/{id}`     | Share a task with another user       | `{ username, permission }`   |
| GET    | `/api/tasks/{id}/shared`    | Get users a task is shared with      | None                         |


## Permissions

| Method | Endpoint           | Description                | Payload |
|--------|---------------------|----------------------------|---------|
| GET    | `/api/permissions` | Get list of permissions    | None    |


```dotenv
tasklist/
├── backend/              # Laravel Backend
│   ├── app/              # Application code
│   ├── database/         # Migrations and Seeders
│   ├── public/           # Publicly accessible files
│   ├── .env              # Environment file
│   └── Dockerfile        # Docker configuration
├── frontend/             # Next.js Frontend
│   ├── src/            # Page components
│   ├── components/       # Reusable components
│   ├── .env.local        # Environment file
│   └── Dockerfile        # Docker configuration
├── docker-compose.yml    # Multi-container setup
└── README.md             # Documentation

```

### Troubleshooting

Ports in Use: Stop other services running on 9001 or 3000 before starting Docker.
Environment Variables: Double-check .env files for typos or missing keys.
