# BlogRealm

**BlogRealm** is a modern blog website built using React, Redux, and Vite. It supports rich text editing with TinyMCE and uses Appwrite for backend services. The project is styled using Tailwind CSS, ensuring a sleek and responsive user interface.

## Features

- Create and edit blog posts with a rich text editor (TinyMCE).
- User authentication and data management using Appwrite.
- Responsive design powered by Tailwind CSS.
- Navigation with React Router.
- State management with Redux Toolkit.
- Client-side form validation using React Hook Form.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [npm](https://www.npmjs.com/get-npm) (v6 or higher)

## Getting Started

To run BlogRealm locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/abhayy1202/blogrealm.git
cd blogrealm
```

### 2. Install dependencies:
```bash
npm install
```

## Packages Used
The following are the key packages used in the project:

### Core Dependencies
- React: A JavaScript library for building user interfaces.
- React DOM: For rendering React components.
- React Redux: To manage the global state of the application.
- @reduxjs/toolkit: To simplify the use of Redux.
- React Router DOM: For client-side routing.
- React Hook Form: For managing form state.
- Appwrite: For backend services like authentication, database, etc.
- @tinymce/tinymce-react: For embedding a rich text editor.
- HTML React Parser: To parse HTML content within React components.
- Lucide React: For scalable vector icons.
### Development Dependencies
- Vite: A fast build tool for modern web projects.
- ESLint: To maintain code quality and consistency.
- Tailwind CSS: A utility-first CSS framework for styling.
- Autoprefixer: To add vendor prefixes for cross-browser compatibility.

## Available Scripts
In the project directory, you can run:

```bash
npm run dev
```
Runs the app in development mode. Open http://localhost:3000 to view it in your browser.

```bash
npm run build
```
Builds the app for production to the dist folder.

```bash
npm run preview
```
Previews the production build locally.

```bash
npm run lint
```
Runs ESLint to analyze and fix code issues.

### Tailwind CSS
The project uses Tailwind CSS for styling. If you need to extend the default styles, you can modify the tailwind.config.js file.

### Backend
BlogRealm uses Appwrite as the backend for handling services like authentication and database. Make sure you have the Appwrite server running, and configure it in your .env file as per your Appwrite instance setup.

## License
This project is licensed under the MIT License.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
