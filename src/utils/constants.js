export const initialTasks = [
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
  
  export const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'Home' },
    { id: 'tasks', label: 'Tasks', icon: 'CheckSquare' },
    { id: 'favorites', label: 'Favorites', icon: 'Star' },
    { id: 'archive', label: 'Archive', icon: 'Archive' },
    { id: 'stats', label: 'Statistics', icon: 'BarChart3' }
  ];