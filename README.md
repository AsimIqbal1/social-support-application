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

<img width="1728" height="993" alt="Screenshot 2025-08-26 at 2 03 46 PM" src="https://github.com/user-attachments/assets/bf94b5fb-6258-4914-9fd7-4b50914420e0" />
<img width="772" height="548" alt="Screenshot 2025-08-26 at 2 04 10 PM" src="https://github.com/user-attachments/assets/3907cc8e-dbfd-43d4-a9fb-ac5713cf479c" />


### Application Steps
<img width="937" height="975" alt="Screenshot 2025-08-26 at 2 04 42 PM" src="https://github.com/user-attachments/assets/c2359d4b-cace-482c-b817-a52f1e84c69b" />
<img width="851" height="308" alt="Screenshot 2025-08-26 at 2 05 32 PM" src="https://github.com/user-attachments/assets/2c251ebf-df1a-4adb-8cc9-f10e233e8fbf" />
<img width="940" height="873" alt="Screenshot 2025-08-26 at 2 07 17 PM" src="https://github.com/user-attachments/assets/263101e3-fc25-451d-bf10-7a9137c7ec94" />
<img width="942" height="893" alt="Screenshot 2025-08-26 at 2 08 49 PM" src="https://github.com/user-attachments/assets/46cec08f-aad2-4748-b389-565f5a568b14" />
<img width="853" height="500" alt="Screenshot 2025-08-26 at 2 09 31 PM" src="https://github.com/user-attachments/assets/c832a70d-dc0b-49a1-80a6-eca4f06b33ae" />
<img width="618" height="275" alt="Screenshot 2025-08-26 at 2 10 45 PM" src="https://github.com/user-attachments/assets/cb94a97f-4816-4bc1-95ab-0ed4e75830a7" />
<img width="639" height="462" alt="Screenshot 2025-08-26 at 2 09 47 PM" src="https://github.com/user-attachments/assets/4252aaeb-3687-4363-9e7a-5a6a76b92598" />
<img width="924" height="892" alt="Screenshot 2025-08-26 at 2 11 14 PM" src="https://github.com/user-attachments/assets/2facf1c0-0190-4a83-a791-d5b383638ca2" />
<img width="935" height="889" alt="Screenshot 2025-08-26 at 2 11 30 PM" src="https://github.com/user-attachments/assets/50f24250-b921-47f6-b35d-2aa57787a72c" />
<img width="1728" height="989" alt="Screenshot 2025-08-26 at 2 11 46 PM" src="https://github.com/user-attachments/assets/4e81e67c-a120-49e4-b948-08ac2b57127a" />
<img width="1527" height="989" alt="Screenshot 2025-08-26 at 2 12 15 PM" src="https://github.com/user-attachments/assets/add67a1f-2826-49a8-990e-bf6cf05809ce" />



### Responsive Design
<img width="527" height="738" alt="Screenshot 2025-08-26 at 2 13 45 PM" src="https://github.com/user-attachments/assets/8a4c2ed5-8927-442a-b110-a65c91027c8a" />
<img width="348" height="585" alt="Screenshot 2025-08-26 at 2 14 16 PM" src="https://github.com/user-attachments/assets/f1282354-92f4-47e8-8dd4-971c2ca834f8" />

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
