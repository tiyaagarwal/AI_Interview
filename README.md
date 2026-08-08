# AI Interview

An AI-powered interview platform with separate `backend` and `frontend` services, designed to help candidates practice interviews and/or help recruiters run AI-assisted interview sessions.

## Features

- AI-driven interview question generation powered by Gemini
- Candidate response evaluation
- REST API for interview session management
- Responsive frontend for conducting/practicing interviews

## Project Structure

```
AI_Interview/
├── backend/    # FastAPI application (API, business logic, AI integration)
├── frontend/   # React application (user interface)
└── .gitignore
```

## Tech Stack

| Frontend | Backend | AI & Storage |
|---|---|---|
| React.js | FastAPI | Google Vertex AI |
| Ant Design (UI library) | Uvicorn (ASGI server) | Gemini-2.0-flash |
| Axios (API calls) | Python 3.12+ | MongoDB Atlas |
| React Toastify | Pydantic | |

## Getting Started

### Prerequisites

- Git
- Python 3.12+
- Node.js and npm
- A MongoDB Atlas cluster
- A Google Cloud project with Vertex AI enabled (for Gemini-2.0-flash access)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/tiyaagarwal/AI_Interview.git
   cd AI_Interview
   ```

2. Set up the backend
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Set up the frontend
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the `backend` directory with the required keys, for example:

```
MONGODB_URI=your_mongodb_atlas_connection_string
GOOGLE_APPLICATION_CREDENTIALS=path_to_your_service_account_json
GCP_PROJECT_ID=your_gcp_project_id
GEMINI_MODEL=gemini-2.0-flash
PORT=8000
```

### Running the App

1. Start the backend
   ```bash
   cd backend
   uvicorn main:app --reload --port 8000
   ```

2. Start the frontend
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser at `http://localhost:3000` (frontend) — the API will be available at `http://localhost:8000`

## Usage

Once both servers are running, open the frontend in your browser, start an interview session, and interact with the AI interviewer in real time. Responses are evaluated and stored via the backend, with session data persisted in MongoDB Atlas.

## Contributing

Contributions are welcome. Please open an issue to discuss what you'd like to change, then submit a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to the branch and open a pull request

## License

This project is licensed under the MIT License.
