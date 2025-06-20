import React, { useState, useReducer } from 'react';
import taskReducer from '../utils/taskReducer';
import { getPriorityColor, getCategoryColor } from '../utils/helpers';
import {
  Plus, Check, Trash2, Edit3, Search, Filter, Calendar, User, Clock, Star, Bell,
  Download, Upload, Moon, Sun, Settings, BarChart3, Archive, Tag, AlertCircle,
  Menu, X, Home, CheckSquare, Bookmark
} from 'lucide-react';

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
  // ... (move the entire TaskManager component code here, except reducer and helpers)
};

export default TaskManager;
