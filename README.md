# CodeScope - AI-Powered Code Analysis Assistant

A simple RAG (Retrieval-Augmented Generation) app built with Django and React.js that provides AI-powered code analysis and assistance.

## Tech Stack

- **Backend**: Django 6.0.1 - REST API server and request handling
- **Frontend**: React.js 19.2.3 - Interactive user interface
- **AI Engine**: Groq API with Llama-3.1-8b-instant model

## Features

- **Ask Questions**: Get AI-powered answers to general questions about code and best practices
- **Explain Code**: Receive detailed explanations for code snippets
- **Project Flow**: Understand the overall structure and flow of your project

## Prerequisites

- Python 3.8+
- Node.js 14+
- Groq API key (obtain from https://console.groq.com)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Internal_DOC_Reader
```

### 2. Backend Setup (Django)

#### Install Python Dependencies
```bash
pip install -r requirements.txt
```

#### Configure Environment Variables
Create a `.env` file in the project root:
```
GROQ_API_KEY=your_groq_api_key_here
```

#### Initialize Database
```bash
python manage.py migrate
```

#### Run Django Server
```bash
python manage.py runserver
```
The Django server will run on `http://localhost:8000`

### 3. Frontend Setup (React)

#### Navigate to Frontend Directory
```bash
cd frontend
```

#### Install Dependencies
```bash
npm install
```

#### Start React Development Server
```bash
npm start
```
The React app will run on `http://localhost:3000`

## Project Structure

```
Internal_DOC_Reader/
├── assistant/           # Django app for AI assistance
│   ├── models.py       # Database models
│   ├── views.py        # API endpoints
│   ├── urls.py         # URL routing
│   └── ...
├── Internal_DOC_Reader/ # Django project settings
│   ├── settings.py     # Project configuration
│   ├── urls.py         # Main URL routing
│   └── ...
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # React components
│   │   │   ├── Ask.js          # Question answering component
│   │   │   ├── ExplainCode.js  # Code explanation component
│   │   │   └── ProjectFlow.js  # Project flow visualization
│   │   ├── App.js      # Main app component
│   │   ├── api.js      # API communication module
│   │   └── ...
│   └── package.json    # Frontend dependencies
├── manage.py           # Django management utility
├── requirements.txt    # Python dependencies
└── db.sqlite3         # SQLite database
```

## Dependencies

### Backend (Python)
- Django 6.0.1
- python-dotenv 1.0.0
- groq >= 0.9.0

### Frontend (Node.js)
- react 19.2.3
- react-dom 19.2.3
- react-scripts 5.0.1

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Use the **Ask** section to submit questions
3. Use the **Explain Code** section to get explanations for code snippets
4. View your **Project Flow** to understand project structure

## Environment Variables

Create a `.env` file in the project root with:
```
GROQ_API_KEY=your_api_key
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is provided as-is for educational and internal use. 
