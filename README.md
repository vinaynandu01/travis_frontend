# TRAVIS - TRansformer-based Assistant for VIsually impaired Service agents

A comprehensive AI-powered help desk system designed specifically for visually impaired bank service agents, featuring transformer-based query processing, multilingual support, and voice assistance capabilities.

## 🚀 Live Demo

Visit the live application: [travis-frontend.vercel.app](https://travis-frontend.vercel.app)

## 📋 About

TRAVIS is an innovative GenAI project that empowers visually impaired bank representatives to handle customer queries efficiently. The system processes customer queries, classifies them into standardized categories, provides accurate responses, translates them into local languages (Telugu), and converts them into speech for seamless communication.

This transformer-based AI system is built from scratch to provide accurate, timely responses while ensuring accessibility and ease of use for visually impaired service agents.

## ✨ Key Features

### Frontend Features
- **Home Page**: Landing page with project overview
- **Agent Registration**: Comprehensive registration with face recognition setup
  - Username, email, password collection
  - Seven facial images capture for face recognition training
  - Secure data transmission to backend
- **Agent Login**: Biometric authentication using face recognition
- **Admin Login**: Traditional username/password authentication
- **Agent Dashboard**: Interactive chatbot interface for handling customer queries
- **Admin Dashboard**: Administrative panel for system management
- **Voice Assistance**: Text-to-speech functionality for Telugu translations
- **Responsive Design**: Optimized for accessibility

### AI/ML Features
- **Transformer-based Query Processing**: Custom-built transformer models for query understanding
- **Query Classification**: Automatic categorization of customer queries
- **Multilingual Support**: English to Telugu translation
- **Text-to-Speech**: Audio output for translated responses
- **Face Recognition**: Biometric authentication for secure agent login

## 🛠️ Tech Stack

### Frontend
- **Framework**: React + Vite
- **Deployment**: Vercel
- **Styling**: Modern CSS with accessibility focus
- **Camera Integration**: WebRTC for face capture

### Backend Services
- **Authentication Backend**: Flask API deployed on Hugging Face Spaces
  - Handles agent registration and face recognition login
  - Admin authentication
  - MongoDB integration for user data storage
- **AI Model Backend**: Flask API deployed on Hugging Face Spaces
  - Transformer-based query processing (`/generate` endpoint)
  - English to Telugu translation (`/translate` endpoint)
  - Text-to-speech conversion (`/audio` endpoint)

### Database
- **Primary Database**: MongoDB
  - User credentials storage
  - Face recognition data
  - Admin authentication data

### AI/ML
- **Custom Transformer Models**: Built from scratch for banking domain
- **Face Recognition**: Custom implementation for agent authentication
- **TTS Engine**: Text-to-speech for Telugu language support

## 🏗️ System Architecture

```
Frontend (React + Vite)
├── Home Page
├── Agent Registration → Face Recognition Setup
├── Agent Login → Face Recognition Auth
├── Admin Login → Traditional Auth
├── Agent Dashboard → Chatbot Interface
└── Admin Dashboard → Management Panel
         │
         ▼
Backend Services (Hugging Face Spaces)
├── Travis Login Service
│   ├── Agent Registration API
│   ├── Face Recognition Login
│   └── Admin Authentication
└── Final Model Service
    ├── /generate → Query Processing
    ├── /translate → English to Telugu
    └── /audio → Text-to-Speech
         │
         ▼
MongoDB Database
├── Agent Profiles
├── Face Recognition Data
└── Admin Credentials
```

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Modern web browser with camera access
- Internet connection for backend services

### Installation

1. Clone the repository
```bash
git clone [your-repo-url]
cd travis-frontend
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Add the following environment variables:
```env
VITE_TRAVIS_LOGIN_API=https://your-huggingface-login-backend.hf.space
VITE_FINAL_MODEL_API=https://your-huggingface-model-backend.hf.space
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📁 Project Structure

```
travis-frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Auth/        # Authentication components
│   │   ├── Dashboard/   # Dashboard components
│   │   └── Common/      # Shared components
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── AgentLogin.jsx
│   │   ├── AgentRegister.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AgentDashboard.jsx
│   │   └── AdminDashboard.jsx
│   ├── services/        # API service functions
│   ├── utils/           # Utility functions
│   ├── hooks/           # Custom React hooks
│   └── styles/          # CSS and styling files
├── package.json
└── README.md
```

## 🎯 Usage

### For Agents
1. **Registration**: Navigate to agent registration, provide details, and capture seven facial images
2. **Login**: Use face recognition to securely log into the system
3. **Dashboard**: Access the chatbot interface to handle customer queries
4. **Query Processing**: Input customer queries to receive AI-generated responses
5. **Translation**: Get responses translated to Telugu for local communication
6. **Voice Output**: Listen to audio versions of translated responses

### For Administrators
1. **Login**: Use admin credentials to access the system
2. **Dashboard**: Monitor system usage and manage agent accounts
3. **Analytics**: View system performance and usage statistics

## 🚀 Deployment

### Frontend Deployment (Vercel)
The frontend is automatically deployed to Vercel. Any push to the main branch triggers a new deployment.

### Backend Services (Hugging Face Spaces)
Both backend services are deployed as Docker containers on Hugging Face Spaces:
- **Travis Login**: Handles authentication and user management
- **Final Model**: Processes queries and provides AI responses

## 🔐 Security Features

- **Face Recognition Authentication**: Secure biometric login for agents
- **Data Encryption**: All sensitive data is encrypted in transit and at rest
- **MongoDB Security**: Secure database connections and data storage
- **API Security**: Protected endpoints with proper authentication

## 🌐 API Endpoints

### Travis Login Backend
- `POST /agent/register` - Agent registration with face data
- `POST /agent/login` - Face recognition login
- `POST /admin/login` - Admin authentication

### Final Model Backend
- `POST /generate` - Process customer queries
- `POST /translate` - English to Telugu translation
- `POST /audio` - Text-to-speech conversion

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🔧 Development Notes

- The system uses custom transformer models built specifically for banking domain queries
- Face recognition system requires seven images for optimal accuracy
- All AI processing is handled by Hugging Face backend services
- Frontend is optimized for accessibility and screen reader compatibility

## 📱 Browser Compatibility

- Modern browsers with WebRTC support for camera access
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers with camera permissions

## 🎯 Future Enhancements

- Multi-language support beyond Telugu
- Advanced analytics dashboard
- Voice input recognition
- Mobile application version
- Enhanced security features

## 📧 Contact

For questions or support regarding TRAVIS, please reach out through the project repository.

Project Link: [https://travis-frontend.vercel.app](https://travis-frontend.vercel.app)

## 🙏 Acknowledgments

- Hugging Face for hosting the backend services
- Vercel for frontend deployment
- MongoDB for database services
- Open source transformer model communities
- Accessibility guidelines and standards

---

**TRAVIS** - Empowering visually impaired service agents with AI-powered assistance