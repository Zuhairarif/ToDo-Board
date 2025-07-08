
import React, { useState } from 'react';
import { Edit, Trash2, User, Calendar, Sparkles } from 'lucide-react';

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

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
  onSmartAssign: () => void;
}

const TaskCard = ({ task, index, onEdit, onDelete, onSmartAssign }: TaskCardProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', task.id);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-move group ${
        isDragging ? 'opacity-50 transform rotate-3 scale-105' : 'hover:-translate-y-1'
      } animate-fade-in`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-medium text-gray-900 text-sm leading-tight">
          {task.title}
        </h4>
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={onSmartAssign}
            className="p-1 text-purple-500 hover:bg-purple-50 rounded transition-colors duration-200"
            title="Smart Assign"
          >
            <Sparkles className="w-3 h-3" />
          </button>
          <button
            onClick={onEdit}
            className="p-1 text-blue-500 hover:bg-blue-50 rounded transition-colors duration-200"
            title="Edit Task"
          >
            <Edit className="w-3 h-3" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors duration-200"
            title="Delete Task"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <User className="w-3 h-3" />
          <span className="truncate max-w-20">{task.assignedUser}</span>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-400">
          <Calendar className="w-3 h-3 mr-1" />
          <span>Updated {new Date(task.updatedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
