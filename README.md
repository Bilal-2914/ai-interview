# Interview AI 🤖

Interview AI is a cutting-edge, full-stack application designed to help job seekers prepare for interviews using AI-driven insights. It analyzes resumes and job descriptions to generate tailored technical and behavioral questions, provides a day-by-day preparation roadmap, and identifies core skill gaps.

## ✨ Features

- **AI-Powered Interview Prep**: Generates personalized technical and behavioral questions based on your resume and target job.
- **Dynamic Roadmap**: Provides a structured, day-by-day preparation plan.
- **Skill Gap Analysis**: Identifies areas of improvement to focus on during your prep.
- **Optimized Resume Download**: Generates an optimized version of your resume tailored for the specific role.
- **Premium User Dashboard**: A sleek, glassmorphic UI to manage your interview reports and history.
- **Interactive Landing Page**: Modern, high-conversion landing page detailing features and pricing.

## 🚀 Tech Stack

### Frontend

- **Framework**: React 19 (Vite)
- **Styling**: SCSS / SASS
- **Routing**: React Router 7
- **API Client**: Axios

### Backend

- **Environment**: Node.js (Express)
- **AI Engine**: Google Gemini API
- **Database**: MongoDB (Mongoose)
- **PDF Parsing/Generation**: pdf-parse & Puppeteer
- **Validation**: Zod

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18+)
- MongoDB
- Google Gemini API Key

### 1. Clone the repository

```bash
git clone https://github.com/Bilal-2914/ai-interview.git
cd ai-interview
```

### 2. Backend Setup

1. Navigate to the backend directory: `cd Backend`
2. Install dependencies: `npm install`
3. Create a `.env` file and add the following:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   GOOGLE_GENAI_API_KEY=your_gemini_api_key
   ORIGIN=http://localhost:5173
   ```
4. Start the server: `npm run dev`

### 3. Frontend Setup

1. Navigate to the frontend directory: `cd Frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## 🎨 UI/UX Design

The application features a **Premium Dark Theme** with:

- **Glassmorphism**: Sophisticated translucent layers.
- **Micro-interactions**: Pulse animations and smooth transitions.
- **Responsive Design**: optimized for both desktop and mobile views.

## 📄 License

This project is licensed under the ISC License.

---

_Built with ❤️ for better career growth._
