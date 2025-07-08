
import React from 'react';
import TaskCard from './TaskCard';

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

interface Column {
  id: string;
  title: string;
  color: string;
}

interface TaskColumnProps {
  column: Column;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onSmartAssign: (taskId: string) => void;
  onDragEnd: (result: any) => void;
}

const TaskColumn = ({ 
  column, 
  tasks, 
  onEditTask, 
  onDeleteTask, 
  onSmartAssign,
  onDragEnd 
}: TaskColumnProps) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    onDragEnd({
      draggableId: taskId,
      source: { droppableId: 'source' },
      destination: { droppableId: column.id }
    });
  };

  return (
    <div 
      className={`${column.color} border-2 rounded-xl p-4 h-full min-h-96 transition-all duration-200`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">{column.title}</h3>
        <span className="bg-white/80 text-gray-600 text-xs px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            index={index}
            onEdit={() => onEditTask(task)}
            onDelete={() => onDeleteTask(task.id)}
            onSmartAssign={() => onSmartAssign(task.id)}
          />
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p className="text-sm">No tasks yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
