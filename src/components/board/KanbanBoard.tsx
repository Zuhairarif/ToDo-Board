import React, { useState, useEffect } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import TaskColumn from './TaskColumn';
import TaskModal from './TaskModal';
import ConflictModal from './ConflictModal';

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

interface KanbanBoardProps {
  currentUser: any;
}

const KanbanBoard = ({ currentUser }: KanbanBoardProps) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Setup Project Repository',
      description: 'Create GitHub repository and initial project structure',
      assignedUser: 'Demo User',
      status: 'done',
      priority: 'high',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Design Database Schema',
      description: 'Plan and create database tables for tasks and users',
      assignedUser: 'Demo User',
      status: 'inprogress',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Implement Real-time Updates',
      description: 'Add WebSocket functionality for live collaboration',
      assignedUser: 'Demo User',
      status: 'todo',
      priority: 'high',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);
  
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [conflictData, setConflictData] = useState(null);

  const columns = [
    { id: 'todo', title: 'To Do', color: 'border-red-200 bg-red-50' },
    { id: 'inprogress', title: 'In Progress', color: 'border-yellow-200 bg-yellow-50' },
    { id: 'done', title: 'Done', color: 'border-green-200 bg-green-50' }
  ];

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (editingTask) {
      // Update existing task
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
          : task
      ));
    } else {
      // Create new task
      const newTask: Task = {
        id: Date.now().toString(),
        title: taskData.title || '',
        description: taskData.description || '',
        assignedUser: taskData.assignedUser || currentUser.name,
        status: taskData.status || 'todo',
        priority: taskData.priority || 'medium',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setTasks([...tasks, newTask]);
    }
    setShowTaskModal(false);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId) return;

    const task = tasks.find(t => t.id === draggableId);
    if (!task) return;

    const newStatus = destination.droppableId as 'todo' | 'inprogress' | 'done';
    
    setTasks(tasks.map(t => 
      t.id === draggableId 
        ? { ...t, status: newStatus, updatedAt: new Date().toISOString() }
        : t
    ));
  };

  const handleSmartAssign = (taskId: string) => {
    // Demo smart assign - assigns to user with fewest tasks
    const userTaskCounts = tasks.reduce((acc, task) => {
      acc[task.assignedUser] = (acc[task.assignedUser] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // For demo, we'll just assign to current user
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, assignedUser: currentUser.name, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Project Board</h2>
        <button
          onClick={handleCreateTask}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        {columns.map(column => (
          <TaskColumn
            key={column.id}
            column={column}
            tasks={tasks.filter(task => task.status === column.id)}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onSmartAssign={handleSmartAssign}
            onDragEnd={handleDragEnd}
          />
        ))}
      </div>

      {showTaskModal && (
        <TaskModal
          task={editingTask}
          existingTasks={tasks}
          onSave={handleSaveTask}
          onClose={() => setShowTaskModal(false)}
        />
      )}

      {showConflictModal && (
        <ConflictModal
          conflictData={conflictData}
          onResolve={() => setShowConflictModal(false)}
          onClose={() => setShowConflictModal(false)}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
