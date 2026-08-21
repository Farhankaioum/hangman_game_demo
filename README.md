# Hangman Game - Full Stack Application

## Prerequisites

### Option 1: Run Locally

- Python 3.8 or higher
- Node.js 18 or higher
- npm or yarn

### Option 2: Run with Docker

- Docker Engine 20.10+
- Docker Compose 2.0+

## Installation

### Clone the Repository

```bash
git clone https://github.com/Farhankaioum/hangman_game_demo.git
cd hangman_game_demo
```
# Run Backend
## Navigate to backend directory
cd backend

## Create virtual environment
python -m venv venv

## Activate virtual environment
### On macOS/Linux:
source venv/bin/activate

### On Windows:
venv\Scripts\activate

## Install dependencies
pip install -r requirements.txt

## Run migrations
#### python manage.py makemigrations
#### python manage.py migrate

## Start backend server
python manage.py runserver

The backend will be available at: http://localhost:8000

# Run Frontend
## Navigate to frontend directory
cd frontend

## Install dependencies
npm install

## Start development server
npm run dev

The frontend will be available at: http://localhost:5173

# Running with Docker and Docker Compose
## Build and start all services
docker-compose up -d


## Run migrations
docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate

## Accessing the Application
#### Frontend: http://localhost:5173
#### Backend API: http://localhost:8000


## Stop all services
docker-compose down
