# TaskManager Pro

A modern, feature-rich task management application built with React. TaskManager Pro helps you organize, track, and manage your tasks with an intuitive interface and powerful features.

![TaskManager Pro](https://img.shields.io/badge/React-18.0+-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-active-brightgreen.svg)

## ✨ Features

### Core Functionality
- **Task Management**: Create, edit, delete, and organize tasks
- **Smart Filtering**: Filter by status, priority, category, or favorites
- **Multiple Sorting Options**: Sort by creation date, priority, due date, or title
- **Search Functionality**: Quick search across task titles, descriptions, and tags
- **Bulk Operations**: Select multiple tasks for bulk completion or deletion

### Advanced Features
- **Priority Levels**: High, medium, and low priority classification with color coding
- **Categories**: Organize tasks by Design, Development, Marketing, or General categories
- **Due Dates**: Set and track task deadlines with visual indicators
- **Favorites System**: Star important tasks for quick access
- **Archive System**: Archive completed tasks while keeping them accessible
- **Dark Mode**: Toggle between light and dark themes
- **Export Functionality**: Export tasks to JSON format

### User Experience
- **Responsive Design**: Fully responsive interface that works on all devices
- **Mobile-First Navigation**: Collapsible mobile menu with touch-friendly controls
- **Real-time Notifications**: Toast notifications for user actions
- **Statistics Dashboard**: Overview of task completion and productivity metrics
- **Intuitive Interface**: Clean, modern design with smooth animations

## 🚀 Demo

The application includes sample tasks to demonstrate functionality:
- Design tasks with high priority
- Development tasks with code review workflows
- Color-coded priority and category systems
- Interactive task completion tracking

## 🛠️ Installation

### Prerequisites
- Node.js (v16.0 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/ultron-18/taskmanager-pro.git
   cd taskmanager-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 📋 Usage

### Getting Started
1. **Add Your First Task**: Click the "Add Task" button or use the mobile menu
2. **Fill Task Details**: Enter title, description, priority, category, and due date
3. **Manage Tasks**: Use the dashboard to view, edit, complete, or delete tasks
4. **Organize**: Use filters and search to find specific tasks quickly

### Key Actions
- **Complete Task**: Click the checkbox next to any task
- **Star Favorites**: Click the star icon to mark important tasks
- **Edit Tasks**: Use the edit button to modify task details
- **Archive Tasks**: Move completed tasks to archive for organization
- **Bulk Operations**: Select multiple tasks for batch actions

### Navigation
- **Dashboard**: Overview of all tasks and statistics
- **Tasks**: Full task management interface
- **Favorites**: Quick access to starred tasks
- **Archive**: View completed and archived tasks
- **Statistics**: Productivity insights and metrics

## 🏗️ Technologies Used

### Frontend Framework
- **React 18+**: Modern React with hooks and functional components
- **Vite**: Next-generation frontend tooling for fast development
- **JavaScript ES6+**: Modern JavaScript features and syntax

### UI Libraries
- **Lucide React**: Beautiful, customizable icons
- **Tailwind CSS**: Utility-first CSS framework for styling

### State Management
- **React useReducer**: Complex state management for task operations
- **React useState**: Local component state management

### Features
- **React useEffect**: Side effects and lifecycle management
- **Local Storage**: Task persistence (can be easily integrated)
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 📁 Project Structure

```
taskmanager-pro/
├── public/
│   ├── index.html              # HTML template
│   └── favicon.ico             # Application icon
├── src/
│   ├── components/
│   │   └── TaskManager.jsx     # Main component
│   ├── styles/
│   │   └── index.css           # Global styles
│   ├── utils/
│   │   ├── taskReducer.js      # State management logic
│   │   └── helpers.js          # Utility functions
│   ├── App.jsx                 # Root component
│   └── main.jsx                # Vite entry point
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🎨 Component Architecture

### Main Components
- **TaskManager**: Root component managing all application state
- **Navigation**: Responsive navigation with mobile menu
- **TaskCard**: Individual task display and interaction
- **TaskForm**: Add/edit task forms with validation
- **StatsCards**: Dashboard statistics display
- **NotificationSystem**: Toast notifications for user feedback

### State Management
- **taskReducer**: Handles all task-related state changes
- **Local State**: UI state management for forms, filters, and views
- **Derived State**: Computed values for statistics and filtered data

## 🔧 Configuration

### Customization Options
- **Categories**: Modify task categories in the component
- **Priority Levels**: Adjust priority options and colors
- **Themes**: Customize dark/light mode colors
- **Export Format**: Modify data export structure

### Environment Setup
The application is built with Vite for fast development and optimized production builds. For production deployment:

1. **Build the application**
   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Preview the production build**
   ```bash
   npm run preview
   # or
   yarn preview
   ```

3. **Deploy to your hosting platform**
   ```bash
   # Example for static hosting
   npm install -g serve
   serve -s dist
   ```

### Vite Configuration
The project uses Vite's default React template with additional optimizations:
- Fast Hot Module Replacement (HMR)
- Optimized build process with tree-shaking
- Built-in TypeScript support (if needed)
- Automatic dependency pre-bundling

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 0-768px - Collapsible navigation, stacked layout
- **Tablet**: 768-1024px - Responsive grid, touch-friendly controls
- **Desktop**: 1024px+ - Full navigation, multi-column layout

### Mobile Features
- Touch-friendly interface with larger tap targets
- Swipe gestures for task interactions
- Collapsible navigation menu
- Optimized form layouts for mobile input

## 🚀 Future Enhancements

### Planned Features
- **Backend Integration**: Connect to REST API or GraphQL
- **User Authentication**: Multi-user support with login/logout
- **Real-time Sync**: WebSocket integration for live updates
- **Advanced Filtering**: Date ranges, custom filters, saved searches
- **Task Dependencies**: Link related tasks and create workflows
- **Time Tracking**: Built-in timer for task completion tracking
- **Team Collaboration**: Shared tasks and project management
- **Calendar Integration**: Sync with external calendar applications

### Technical Improvements
- **Progressive Web App**: Offline functionality and app-like experience
- **Performance Optimization**: Virtual scrolling for large task lists
- **Accessibility**: Enhanced screen reader support and keyboard navigation
- **Testing Suite**: Comprehensive unit and integration tests
- **TypeScript**: Type safety and better developer experience

## 🤝 Contributing

We welcome contributions to TaskManager Pro! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed
- Ensure responsive design principles are maintained

### Areas for Contribution
- Bug fixes and performance improvements
- New features and enhancements
- UI/UX improvements
- Documentation updates
- Accessibility improvements
- Mobile experience optimization

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 TaskManager Pro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 👨‍💻 Author

**Your Name**
- Email: [igweimohisah@gmail.com](mailto:igweimohisah@gmail.com)
- GitHub: [@ultron-18](https://github.com/ultron-18)
- LinkedIn: [isah igweimoh](https://linkedin.com/in/isahigweimoh)

## 🙏 Acknowledgments

- **React Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Lucide**: For the beautiful icon library
- **Open Source Community**: For inspiration and best practices

## 📞 Support

If you encounter any issues or have questions:

1. **Check the Issues**: Look through existing GitHub issues
2. **Create New Issue**: Provide detailed information about the problem
3. **Discussion**: Use GitHub Discussions for questions and ideas
4. **Email Support**: Contact us directly for urgent matters

---

**Built with ❤️ and React**

*TaskManager Pro - Organize your tasks, organize your life.*