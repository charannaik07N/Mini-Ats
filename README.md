# Mini ATS - Applicant Tracking System

A comprehensive applicant tracking system featuring a Kanban board for candidate management and an analytics dashboard for recruitment insights.

![Mini ATS Demo](https://placeholder-for-screenshot.png)

## 🚀 Features

### Kanban Board
- **Visual Candidate Pipeline**: Drag-and-drop interface for managing candidates through different stages
- **Status Tracking**: Track candidates through Applied, Interview, Offer, and Rejected stages
- **Filtering & Search**: Filter candidates by role or search by name/email/role
- **Add Candidates**: Quick form to add new candidates to the pipeline

### Analytics Dashboard
- **Status Distribution**: Visual breakdown of candidates by application status
- **Role Distribution**: Chart showing candidate distribution by job role
- **Experience Statistics**: Average, minimum, and maximum candidate experience
- **Recent Applications**: Track applications received in the last 30 days
- **Monthly Trends**: Application trends over time

### Backend API
- **RESTful Architecture**: Well-organized endpoints for all CRUD operations
- **Filtering & Sorting**: Advanced query parameters for data retrieval
- **Data Validation**: Robust input validation and error handling
- **MongoDB Integration**: Efficient database operations with proper indexing

## 🛠️ Technology Stack

### Frontend
- **React**: Modern React with hooks for state management
- **Vite**: Fast build tooling
- **React Router**: Application routing
- **Hello-Pangea/DnD**: Drag and drop functionality
- **Recharts**: Interactive charts for analytics
- **Tailwind CSS**: Utility-first styling
- **Axios**: API communication

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **Express Validator**: Input validation
- **Dotenv**: Environment configuration
- **CORS**: Cross-origin resource sharing
- **Multer**: File upload handling (configured)

## 📋 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or Atlas account)
- Git

### Clone the Repository
```bash
git clone https://your-repository-url/mini-ats.git
cd mini-ats
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Create .env file with the following variables:
# PORT=5001
# NODE_ENV=development
# FRONTEND_URL=http://localhost:5174
# MONGO_URI=mongodb://localhost:27017/mini-ats
# JWT_SECRET=your-secret-key

# Start the backend server in development mode
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

## 🖥️ Usage

### Accessing the Application
- **Frontend**: http://localhost:5174
- **Backend API**: http://localhost:5001/api

### Kanban Board
1. View candidates by status column (Applied, Interview, Offer, Rejected)
2. Drag candidates between columns to update their status
3. Filter candidates using the search bar and role filter
4. Add new candidates with the "Add Candidate" button

### Analytics Dashboard
1. Navigate to the Analytics page via the navigation bar
2. View key statistics about your candidate pipeline
3. Explore candidate distribution by status and role
4. Track recent application trends

## 📁 Project Structure

```
mini-ats/
├── backend/                 # Backend Node.js/Express API
│   ├── config/              # Configuration files
│   ├── controllers/         # Request handlers
│   ├── models/              # Database schemas
│   ├── Routes/              # API routes
│   ├── .env                 # Environment variables
│   └── server.js            # Server entry point
│
├── frontend/                # React frontend application
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   │   ├── Analytics/       # Analytics components
│   │   ├── api/             # API integration
│   │   ├── assets/          # Images and assets
│   │   ├── components/      # Shared components
│   │   ├── Kanban/          # Kanban board components
│   │   ├── Utils/           # Utility functions
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Application entry point
│   ├── .gitignore           # Git ignore file
│   └── vite.config.js       # Vite configuration
│
└── README.md                # Project documentation
```

## 🔧 Development

### Backend API Testing
The backend includes a comprehensive set of API endpoints for candidate management:

- `GET /api/candidates`: List all candidates (with filtering options)
- `POST /api/candidates`: Add a new candidate
- `GET /api/candidates/:id`: Get a specific candidate
- `PUT /api/candidates/:id`: Update a candidate
- `DELETE /api/candidates/:id`: Remove a candidate
- `GET /api/candidates/analytics`: Get recruitment analytics

### Frontend Development
- All frontend components are organized by feature
- API calls are centralized in the `api` directory
- Styles are managed through Tailwind CSS utility classes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'feat: add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Icons provided by [Heroicons](https://heroicons.com/)
- Charts powered by [Recharts](https://recharts.org/)
- Drag and drop functionality by [Hello-Pangea/DnD](https://github.com/hello-pangea/dnd)