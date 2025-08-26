# 🤝 Social Support Application

A modern, accessible web application that streamlines the social support application process with AI-powered assistance. The application guides users through a multi-step form to collect necessary information for social support services, featuring intelligent writing assistance and a user-friendly interface.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## ✨ Features

### 🔄 Multi-Step Form Process
- **Personal Information**: Basic demographic and contact details
- **Family & Financial**: Household composition and financial status
- **Situation Description**: Detailed explanation of circumstances with AI assistance
- **Review & Submit**: Final verification before submission

### 🤖 AI-Powered Assistance
- **Smart Writing Help**: AI-generated content suggestions based on user context
- **Contextual Prompts**: Personalized writing assistance for situation descriptions
- **Real-time Editing**: Review and modify AI suggestions before acceptance

### ♿ Accessibility Features
- **ARIA Compliance**: Full screen reader support with proper roles and labels
- **Keyboard Navigation**: Complete keyboard accessibility for all interactions
- **Focus Management**: Clear focus indicators and logical tab order
- **Responsive Design**: Mobile-first approach with cross-device compatibility

### 💾 Data Management
- **Auto-save**: Automatic form data persistence using localStorage
- **Step Navigation**: Jump between completed steps for easy editing
- **Form Validation**: Real-time validation with clear error messages
- **Multi-language Support**: Internationalization ready (English/Arabic)

## 🛠️ Tech Stack

### Frontend
- **⚛️ React 18** - Modern UI library with hooks
- **📘 TypeScript** - Type-safe development
- **🎨 Tailwind CSS** - Utility-first styling
- **🐜 Ant Design** - Professional UI components
- **⚡ Vite** - Fast build tool and dev server
- **🧭 React Router** - Client-side routing
- **📝 React Hook Form** - Performant form handling
- **✅ Zod** - Schema validation

### Backend
- **🟢 Node.js** - Runtime environment
- **📦 Express.js** - Web application framework
- **🤖 OpenAI API** - AI-powered content generation
- **📘 TypeScript** - Type-safe backend development

### Development Tools
- **📋 ESLint** - Code linting
- **🎯 TypeScript Compiler** - Type checking
- **🔧 Vite Config** - Build optimization

## 📸 Screenshots

<!-- Add your screenshots here -->

### Application Steps
*Add screenshots of each form step here*

### AI Writing Assistant
*Add screenshots of the AI assistance feature*

### Responsive Design
*Add mobile and desktop screenshots*

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- OpenAI API key (for AI features)

### Frontend Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   
3. **Start development server**
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp env.example .env
   ```

4. **Add your OpenAI API key**
   ```bash
   # In server/.env file
   OPENAI_API_KEY=your_openai_api_key_here
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

The backend API will be available at `http://localhost:3001`

## 📁 Project Structure

```
social-support-application/
├── 📁 src/                          # Frontend source code
│   ├── 📁 components/               # Reusable UI components
│   ├── 📁 pages/                    # Page components
│   │   └── 📁 initiate-application/ # Main application form
│   │       ├── 📁 components/       # Form step components
│   │       ├── 📁 hooks/           # Custom React hooks
│   │       └── 📄 schemas.ts        # Form validation schemas
│   ├── 📁 services/                 # API and HTTP clients
│   ├── 📁 i18n/                     # Internationalization
│   └── 📁 constants/                # Application constants
├── 📁 server/                       # Backend source code
│   ├── 📁 src/                      # Server source files
│   │   ├── 📁 routes/              # API routes
│   │   ├── 📁 services/            # Business logic
│   │   ├── 📁 middleware/          # Express middleware
│   │   └── 📁 config/              # Server configuration
│   └── 📄 package.json             # Backend dependencies
├── 📄 package.json                  # Frontend dependencies
├── 📄 vite.config.ts               # Vite configuration
├── 📄 tailwind.config.js           # Tailwind CSS config
└── 📄 README.md                    # Project documentation
```