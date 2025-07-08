import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  assignedUser: string;
  status: 'todo' | 'inprogress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

interface TaskModalProps {
  task?: Task | null;
  existingTasks: Task[];
  onSave: (taskData: Partial<Task>) => void;
  onClose: () => void;
}

const TaskModal = ({ task, existingTasks, onSave, onClose }: TaskModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedUser: '',
    status: 'todo' as 'todo' | 'inprogress' | 'done',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  const [validationError, setValidationError] = useState('');

  const columnNames = ['To Do', 'In Progress', 'Done', 'todo', 'inprogress', 'done'];

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        assignedUser: task.assignedUser,
        status: task.status,
        priority: task.priority
      });
    }
  }, [task]);

  const validateTitle = (title: string) => {
    const trimmedTitle = title.trim();
    
    if (!trimmedTitle) {
      return 'Task title is required';
    }

    // Check if title matches column names
    if (columnNames.some(colName => colName.toLowerCase() === trimmedTitle.toLowerCase())) {
      return 'Task title cannot match column names (To Do, In Progress, Done)';
    }

    // Check for unique title (exclude current task if editing)
    const isDuplicate = existingTasks.some(existingTask => 
      existingTask.id !== task?.id && 
      existingTask.title.toLowerCase() === trimmedTitle.toLowerCase()
    );

    if (isDuplicate) {
      return 'Task title must be unique. A task with this title already exists.';
    }

    return '';
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData({ ...formData, title: newTitle });
    
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const titleError = validateTitle(formData.title);
    if (titleError) {
      setValidationError(titleError);
      return;
    }
    
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {task ? 'Edit Task' : 'Create New Task'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={handleTitleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                validationError 
                  ? 'border-red-300 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Enter task title"
            />
            {validationError && (
              <div className="flex items-center space-x-2 mt-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{validationError}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Enter task description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assigned User
            </label>
            <input
              type="text"
              value={formData.assignedUser}
              onChange={(e) => setFormData({ ...formData, assignedUser: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter assignee name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{task ? 'Update' : 'Create'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
