# Project Setup

## Folder Structure Example

```
project/
  tickets_backend/
  tickets_frontend/
  docker-compose.yml
```

## Docker Compose Configuration

```yaml
version: "3.8"

services:
  # Dev (Vite)
  tickets_frontend_dev:
    build:
      context: ./tickets_frontend
      dockerfile: Dockerfile.dev
    ports:
      - "8080:8080"
    volumes:
      - ./tickets_frontend:/app
      - /app/node_modules
    command: npm run dev
    depends_on:
      - tickets_backend_dev

  # Prod (Nginx)
  tickets_frontend_prod:
    build:
      context: ./tickets_frontend
      dockerfile: Dockerfile.prod
    ports:
      - "8080:8080"
    depends_on:
      - tickets_backend_prod

  # Backend Dev
  tickets_backend_dev:
    build:
      context: ./tickets_backend
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    env_file:
      - ./tickets_backend/.env.dev
    volumes:
      - ./tickets_backend:/app
      - /app/node_modules
    command: npm run start:dev
    depends_on:
      - mongo

  # Backend Prod
  tickets_backend_prod:
    build:
      context: ./tickets_backend
      dockerfile: Dockerfile.prod
    ports:
      - "3000:3000"
    env_file:
      - ./tickets_backend/.env.prod

  mongo:
    image: mongo
    ports:
      - "28017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:

```

## Services Included

This setup includes the following services:

- **Frontend**: React application running with Vite.
- **Backend**: Node.js application using NestJS.
- **Database**: Local instance of MongoDB.

## Useful Commands

### Start the services

```sh
docker-compose up -d --build
```

### Stop the services

```sh
docker-compose down
```

### View logs

```sh
docker-compose logs -f
```

### Restart the services

```sh
docker-compose restart
```

### Remove all containers, networks, and volumes

```sh
docker-compose down -v
```

## Repositories

- **tickets_backend** - [GitHub Repository](https://github.com/AndreyFaichuk/tickets_backend)
- **tickets_frontend** - [GitHub Repository](https://github.com/AndreyFaichuk/tickets_frontend)
