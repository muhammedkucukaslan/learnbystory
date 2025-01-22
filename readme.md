# AI-Powered Language Learning Story Generator

A web application that generates personalized stories and quizzes for language learners using OpenAI. The application creates content based on students' interests to make language learning more engaging and effective.

We built it for a hackathon project on 28 December 2024. So, it was built in less than 24 hours :)

## Features

- Personalized story generation based on student interests
- Automatic quiz generation for reading comprehension
- Interactive user interface for easy navigation
- AI-powered content creation using OpenAI
- Authentication system

## Tech Stack

- **Backend**: Express.js 
- **Frontend**: Next.js
- **AI Integration**: OpenAI API

## Prerequisites    
- OpenAI API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/muhammedkucukaslan/learnbystory
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

4. Add your OpenAI key and PORT to `.env`:
```
OPENAI_API_KEY=your_api_key_here
PORT=8000
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The web application will be available at `http://localhost:3000`.
The backend server will be running at `http://localhost:8000` by default.

## Usage

1. Students log in to the platform
2. Select their interests and language level
3. The system generates personalized stories
4. Students read the story and answer generated questions

## Demo
![demo](/public/main.png)