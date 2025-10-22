# Mini Support Platform 💝

A simplified tip jar and content creator support platform built with React and TypeScript. This project allows fans to support their favorite creators through donations and enables creators to share posts and manage their earnings.

## 📋 Table of Contents

-   [Overview](#overview)
-   [Features](#-features)
-   [Tech Stack](#-tech-stack)
-   [Installation](#-installation)
-   [Usage](#-usage)
-   [Project Structure](#-project-structure)
-   [API Routes](#-api-routes)

## Overview

This Mini Support Platform is a technical test project that demonstrates full-stack development capabilities by implementing a simplified version of platforms like Trakteer or Saweria. The application features OTP-based authentication, secure payment processing, AI-powered content generation, and real-time balance updates .

## ✨ Features

### 🔐 Authentication

-   **Phone-based OTP Login**: Secure authentication with one-time passwords
-   **Console-based OTP Display**: Developer-friendly OTP viewing during development

### 👥 User Roles

-   **Creators**: Can receive donations and create posts
-   **Fans**: Can browse creators and send support

### 💳 Payment System

-   **Support Functionality**: Fans can send donations to creators
-   **Sandbox Payments**: Integration with payment gateway for testing
-   **Real-time Balance Updates**: Live balance tracking with WebSocket

### 🎨 Content Management

-   **Post Creation**: Creators can share text and image content
-   **AI Caption Helper**: AI-powered caption generation for posts
-   **Media Support**: Image URL integration for posts

### 📊 Dashboard

-   **Balance Overview**: Real-time donation earnings display
-   **Post Management**: Interface for creating and managing content
-   **Responsive Design**: Mobile-friendly interface

## 🛠 Tech Stack

### Frontend

-   **React 18+** - UI framework
-   **TypeScript** - Type safety
-   **Tailwind CSS** - Styling framework
-   **Shadcn/UI** - Component library
-   **React Router v7** - Routing solution
-   **React Hook Form** - Form management
-   **Zod** - Schema validation

### Development Tools

-   **Lucide React** - Icon library
-   **Class Variance Authority** - Component variant management

## 📥 Installation

Follow these steps to set up the project locally:

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/mini-support-platform.git
    cd mini-support-platform
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

    ```env
    VITE_API_URL=your_api_url_here
    VITE_AI_SERVICE_URL=your_ai_service_url
    VITE_PAYMENT_GATEWAY_KEY=your_payment_gateway_key
    ```

4. **Start the development server**
    ```bash
    npm run dev
    ```

The application will open at `http://localhost:5173` (or the next available port).

## 🚀 Usage

### For Fans

1. **Login** using your phone number with OTP verification
2. **Browse creators** on the creators page
3. **Select a creator** to view their profile and posts
4. **Click "Support Creator"** to send a donation
5. **Complete payment** through the sandbox payment gateway

### For Creators

1. **Login** to access your dashboard
2. **View your balance** and donation history
3. **Create new posts** with text and images
4. **Use AI Caption Helper** to generate engaging captions
5. **Monitor earnings** in real-time

### OTP Login Flow

During development, OTP codes are displayed in the browser console for testing purposes.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI components
│   ├── forms/          # Form components
│   └── layouts/        # Layout components
├── pages/              # Page components
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   └── CreatorsPage.tsx
├── lib/                # Utility libraries
│   ├── utils.ts        # Common utilities
│   └── validations.ts  # Zod schemas
├── contexts/           # React contexts
└── types/              # TypeScript type definitions
```

## 🔌 API Routes

The application uses the following main routes:

-   **`/login`** - OTP-based authentication
-   **`/dashboard`** - User dashboard and balance overview
-   **`/creators`** - Browse and discover creators
-   **`/creators/:id`** - Individual creator profile and posts

## 🎯 Technical Implementation Details

### State Management

-   Global state management for authentication, user sessions, and transactions
-   Real-time state synchronization using WebSocket for balance updates

### Database Relations

The project implements the following data structure:

```sql
users(id, name, role ENUM('creator','fan'))
posts(id, creator_id, text, media_url)
supports(id, fan_id, creator_id, amount, status)
balances(user_id, amount)
```

### Payment Integration

-   Sandbox payment gateway integration for testing transactions
-   Support for various payment statuses (pending, paid, failed)
-   Secure transaction processing

### AI Integration

-   External AI service integration for caption generation
-   Simple API call implementation for text generation

## 🤝 Contributing

This is a technical test project. For development purposes, you can:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is created for technical testing purposes. All rights reserved by the applicant.

---

_Built with React, TypeScript, and modern web technologies as part of a technical assessment._

```

This README provides comprehensive documentation for your technical test project, covering all the essential aspects that employers or reviewers would look for. It clearly demonstrates your understanding of the project requirements, technical implementation, and professional documentation practices .
```
