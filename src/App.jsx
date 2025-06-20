import React, { useState, useReducer } from 'react';
import {
  Plus, Check, Trash2, Edit3, Search, Filter, Calendar, User, Clock, Star, Bell,
  Download, Upload, Moon, Sun, Settings, BarChart3, Archive, Tag, AlertCircle,
  Menu, X, Home, CheckSquare, Bookmark
} from 'lucide-react';

// Task reducer for state management
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { ...action.payload, id: Date.now(), createdAt: new Date() }];
    case 'TOGGLE_TASK':
      return state.map(task => 
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);
    case 'UPDATE_TASK':
      return state.map(task => 
        task.id === action.payload.id ? { ...task, ...action.payload.updates } : task
      );
    case 'TOGGLE_FAVORITE':
      return state.map(task => 
        task.id === action.payload ? { ...task, favorite: !task.favorite } : task
      );
    case 'LOAD_TASKS':
      return action.payload;
    case 'ARCHIVE_TASK':
      return state.map(task => 
        task.id === action.payload ? { ...task, archived: !task.archived } : task
      );
    case 'BULK_DELETE':
      return state.filter(task => !action.payload.includes(task.id));
    case 'BULK_COMPLETE':
      return state.map(task => 
        action.payload.includes(task.id) ? { ...task, completed: true } : task
      );
    case 'CLEAR_COMPLETED':
      return state.filter(task => !task.completed);
    default:
      return state;
  }
};

// Initial tasks data
const initialTasks = [
  {
    id: 1,
    title: "Design new landing page",
    description: "Create wireframes and mockups for the new product landing page",
    priority: "high",
    category: "Design",
    completed: false,
    favorite: false,
    archived: false,
    dueDate: "2025-06-25",
    createdAt: new Date('2025-06-18'),
    tags: ["ui", "design", "urgent"]
  },
  {
    id: 2,
    title: "Review code changes",
    description: "Review pull requests from the development team",
    priority: "medium",
    category: "Development",
    completed: true,
    favorite: true,
    archived: false,
    dueDate: "2025-06-20",
    createdAt: new Date('2025-06-17'),
    tags: ["code", "review"]
  }
];

const TaskManager = () => {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('created');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'General',
    dueDate: '',
    tags: []
  });
  const [newTag, setNewTag] = useState('');

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter(task => {
      if (!showArchived && task.archived) return false;
      if (showArchived && !task.archived) return false;
      
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (task.tags && task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      const matchesFilter = filterBy === 'all' || 
                           (filterBy === 'completed' && task.completed) ||
                           (filterBy === 'pending' && !task.completed) ||
                           (filterBy === 'favorites' && task.favorite) ||
                           (filterBy === 'overdue' && task.dueDate && new Date(task.dueDate) < new Date() && !task.completed) ||
                           (filterBy === task.priority) ||
                           (filterBy === task.category);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'dueDate':
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      dispatch({
        type: 'ADD_TASK',
        payload: { ...newTask, completed: false, favorite: false, archived: false }
      });
      setNewTask({ title: '', description: '', priority: 'medium', category: 'General', dueDate: '', tags: [] });
      setShowAddForm(false);
      addNotification('Task added successfully!', 'success');
    }
  };

  const handleUpdateTask = () => {
    if (editingTask.title.trim()) {
      dispatch({
        type: 'UPDATE_TASK',
        payload: { id: editingTask.id, updates: editingTask }
      });
      setEditingTask(null);
      addNotification('Task updated successfully!', 'success');
    }
  };

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleBulkAction = (action) => {
    if (selectedTasks.length === 0) return;
    
    switch (action) {
      case 'delete':
        dispatch({ type: 'BULK_DELETE', payload: selectedTasks });
        addNotification(`${selectedTasks.length} tasks deleted`, 'success');
        break;
      case 'complete':
        dispatch({ type: 'BULK_COMPLETE', payload: selectedTasks });
        addNotification(`${selectedTasks.length} tasks completed`, 'success');
        break;
    }
    setSelectedTasks([]);
  };

  const exportTasks = () => {
    const data = JSON.stringify(tasks, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.json';
    a.click();
    URL.revokeObjectURL(url);
    addNotification('Tasks exported successfully!', 'success');
  };

  const addTag = () => {
    if (newTag.trim() && !newTask.tags.includes(newTag.trim())) {
      setNewTask(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setNewTask(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addTagToEditingTask = () => {
    if (newTag.trim() && !editingTask.tags.includes(newTag.trim())) {
      setEditingTask(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTagFromEditingTask = (tagToRemove) => {
    setEditingTask(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Design': 'bg-purple-100 text-purple-800',
      'Development': 'bg-blue-100 text-blue-800',
      'Marketing': 'bg-pink-100 text-pink-800',
      'General': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const stats = {
    total: tasks.filter(t => !t.archived).length,
    completed: tasks.filter(t => t.completed && !t.archived).length,
    pending: tasks.filter(t => !t.completed && !t.archived).length,
    favorites: tasks.filter(t => t.favorite && !t.archived).length,
    overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && !t.completed && !t.archived).length,
    archived: tasks.filter(t => t.archived).length
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'favorites', label: 'Favorites', icon: Star },
    { id: 'archive', label: 'Archive', icon: Archive },
    { id: 'stats', label: 'Statistics', icon: BarChart3 }
  ];

  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
    
    // Update filters based on navigation
    switch (viewId) {
      case 'favorites':
        setFilterBy('favorites');
        setShowArchived(false);
        break;
      case 'archive':
        setShowArchived(true);
        setFilterBy('all');
        break;
      case 'stats':
        setShowStats(true);
        setShowArchived(false);
        break;
      default:
        setShowArchived(false);
        setShowStats(false);
        if (viewId === 'dashboard') setFilterBy('all');
    }
  };

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>
      {/* Responsive Navigation Bar */}
      <nav className={`sticky top-0 z-40 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b backdrop-blur-sm bg-opacity-95`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <CheckSquare className="w-6 h-6 text-white" />
                </div>
                <h1 className={`ml-3 text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  TaskManager Pro
                </h1>
              </div>
            </div>
            
            {/* Desktop Navigation - Always visible */}
            <div className="hidden md:flex items-center space-x-1 ml-10">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                      isActive
                        ? (darkMode ? 'bg-gray-700 text-white' : 'bg-blue-100 text-blue-700')
                        : (darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700')
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                    {item.id === 'tasks' && stats.pending > 0 && (
                      <span className="ml-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                        {stats.pending}
                      </span>
                    )}
                    {item.id === 'favorites' && stats.favorites > 0 && (
                      <span className="ml-1 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {stats.favorites}
                      </span>
                    )}
                    {item.id === 'archive' && stats.archived > 0 && (
                      <span className="ml-1 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                        {stats.archived}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Search - Hidden on mobile */}
              <div className="hidden lg:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Quick search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 w-64 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300'
                  }`}
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'
                }`}>
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300'
                    }`}
                  />
                </div>
              </div>

              {/* Mobile Navigation Items */}
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? (darkMode ? 'bg-gray-700 text-white' : 'bg-blue-100 text-blue-700')
                        : (darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900')
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                    {item.id === 'tasks' && stats.pending > 0 && (
                      <span className="ml-auto bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                        {stats.pending}
                      </span>
                    )}
                    {item.id === 'favorites' && stats.favorites > 0 && (
                      <span className="ml-auto bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                        {stats.favorites}
                      </span>
                    )}
                    {item.id === 'archive' && stats.archived > 0 && (
                      <span className="ml-auto bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                        {stats.archived}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Mobile Add Task Button */}
              <button
                onClick={() => {
                  setShowAddForm(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 mt-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add New Task
              </button>
            </div>
          </div>
        )}
      </nav>
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`px-4 py-3 rounded-lg shadow-lg transition-all transform ${
              notification.type === 'success' ? 'bg-green-500 text-white' :
              notification.type === 'error' ? 'bg-red-500 text-white' :
              'bg-blue-500 text-white'
            } animate-pulse`}
          >
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              {notification.message}
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {currentView === 'dashboard' && 'Dashboard'}
              {currentView === 'tasks' && 'All Tasks'}
              {currentView === 'favorites' && 'Favorite Tasks'}
              {currentView === 'archive' && 'Archived Tasks'}
              {currentView === 'stats' && 'Statistics'}
            </h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {currentView === 'dashboard' && 'Overview of your tasks and productivity'}
              {currentView === 'tasks' && 'Manage and organize your tasks'}
              {currentView === 'favorites' && 'Your starred and important tasks'}
              {currentView === 'archive' && 'Completed and archived tasks'}
              {currentView === 'stats' && 'Your productivity insights and analytics'}
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={exportTasks}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Check className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Favorites</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.favorites}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          {/* Archive Overview Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Archived</p>
                <p className="text-2xl font-bold text-purple-600">{stats.archived}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Archive className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        {(currentView === 'tasks' || currentView === 'dashboard' || currentView === 'favorites' || currentView === 'archive') && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search - Only show on larger screens since it's in navbar on mobile */}
              <div className="relative flex-1 max-w-md lg:hidden">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {/* Filters */}
              <div className="flex gap-3 flex-wrap">
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Tasks</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="favorites">Favorites</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                  <option value="Design">Design</option>
                  <option value="Development">Development</option>
                  <option value="Marketing">Marketing</option>
                  <option value="General">General</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="created">Sort by Created</option>
                  <option value="priority">Sort by Priority</option>
                  <option value="dueDate">Sort by Due Date</option>
                  <option value="title">Sort by Title</option>
                </select>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Add Task
                </button>
                {/* Bulk Delete for Archive view */}
                {currentView === 'archive' && selectedTasks.length > 0 && (
                  <button
                    onClick={() => {
                      dispatch({ type: 'BULK_DELETE', payload: selectedTasks });
                      setSelectedTasks([]);
                      addNotification('Selected archived tasks deleted!', 'success');
                    }}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 font-medium"
                  >
                    <Trash2 className="w-5 h-5" />
                    Delete Selected
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Add Task Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
            <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <textarea
                placeholder="Task description (optional)"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <select
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="General">General</option>
                  <option value="Design">Design</option>
                  <option value="Development">Development</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAddTask}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Task
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Task Form */}
        {editingTask && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
            <h3 className="text-lg font-semibold mb-4">Edit Task</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Task title"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="date"
                  value={editingTask.dueDate}
                  onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <textarea
                placeholder="Task description (optional)"
                value={editingTask.description}
                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={editingTask.priority}
                  onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <select
                  value={editingTask.category}
                  onChange={(e) => setEditingTask({ ...editingTask, category: e.target.value })}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="General">General</option>
                  <option value="Design">Design</option>
                  <option value="Development">Development</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleUpdateTask}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Task
                </button>
                <button
                  onClick={() => setEditingTask(null)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
              <div className="text-gray-400 mb-4">
                <Calendar className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterBy !== 'all' ? 'Try adjusting your search or filters' : 'Get started by adding your first task'}
              </p>
              {!searchTerm && filterBy === 'all' && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Your First Task
                </button>
              )}
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white rounded-xl p-6 shadow-sm border transition-all hover:shadow-md ${
                  task.completed ? 'border-green-200 bg-green-50/30' : 'border-gray-100'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox: In Archive view, use for selection; otherwise, toggle completion */}
                  <button
                    onClick={() => {
                      if (showArchived) {
                        setSelectedTasks(selectedTasks.includes(task.id)
                          ? selectedTasks.filter(id => id !== task.id)
                          : [...selectedTasks, task.id]);
                      } else {
                        dispatch({ type: 'TOGGLE_TASK', payload: task.id });
                      }
                    }}
                    className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      showArchived
                        ? selectedTasks.includes(task.id)
                          ? 'bg-purple-500 border-purple-500 text-white'
                          : 'border-gray-300 hover:border-purple-500'
                        : task.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-green-500'
                    }`}
                  >
                    {showArchived
                      ? selectedTasks.includes(task.id) && <Check className="w-3 h-3" />
                      : task.completed && <Check className="w-3 h-3" />}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold transition-all ${
                          task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                        }`}>
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className={`mt-2 transition-all ${
                            task.completed ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {task.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => dispatch({ type: 'TOGGLE_FAVORITE', payload: task.id })}
                          className={`p-2 rounded-lg transition-colors ${
                            task.favorite
                              ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100'
                              : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                          }`}
                        >
                          <Star className={`w-5 h-5 ${task.favorite ? 'fill-current' : ''}`} />
                        </button>
                        {(!task.archived && !showArchived) && (
                          <>
                            <button
                              onClick={() => {
                                dispatch({ type: 'ARCHIVE_TASK', payload: task.id });
                                addNotification('Task archived!', 'info');
                              }}
                              className={`p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors`}
                            >
                              <Archive className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => setEditingTask(task)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit3 className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        {(task.archived && showArchived) && (
                          <>
                            <button
                              onClick={() => {
                                dispatch({ type: 'ARCHIVE_TASK', payload: task.id });
                                addNotification('Task unarchived!', 'info');
                              }}
                              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            >
                              <Archive className="w-5 h-5" />
                            </button>
                            {/* Checkbox styled and aligned with other icons */}
                            <button
                              onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                task.completed
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-gray-300 hover:border-green-500'
                              }`}
                              title="Toggle Completed"
                            >
                              {task.completed && <Check className="w-3 h-3" />}
                            </button>
                            <button
                              onClick={() => setEditingTask(task)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit3 className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
                        {task.category}
                      </span>
                      <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${
                        task.completed
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'bg-gray-100 text-gray-500 border border-gray-200'
                      }`}>
                        {task.completed ? 'Completed' : 'Not Completed'}
                      </span>
                      {task.dueDate && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;