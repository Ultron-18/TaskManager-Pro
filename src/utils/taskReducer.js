export const taskReducer = (state, action) => {
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