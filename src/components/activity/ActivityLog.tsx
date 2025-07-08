
import React, { useState, useEffect } from 'react';
import { Activity, User, Clock, Edit, Plus, Trash2, ArrowRight } from 'lucide-react';

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  details: string;
  timestamp: string;
  type: 'create' | 'edit' | 'delete' | 'move' | 'assign';
}

const ActivityLog = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      user: 'Demo User',
      action: 'created',
      details: 'Setup Project Repository',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      type: 'create'
    },
    {
      id: '2',
      user: 'Demo User',
      action: 'moved',
      details: 'Design Database Schema from Todo to In Progress',
      timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      type: 'move'
    },
    {
      id: '3',
      user: 'Demo User',
      action: 'updated',
      details: 'Setup Project Repository priority to High',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      type: 'edit'
    }
  ]);

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'create': return <Plus className="w-3 h-3 text-green-600" />;
      case 'edit': return <Edit className="w-3 h-3 text-blue-600" />;
      case 'delete': return <Trash2 className="w-3 h-3 text-red-600" />;
      case 'move': return <ArrowRight className="w-3 h-3 text-purple-600" />;
      case 'assign': return <User className="w-3 h-3 text-orange-600" />;
      default: return <Activity className="w-3 h-3 text-gray-600" />;
    }
  };

  const getActionColor = (type: string) => {
    switch (type) {
      case 'create': return 'bg-green-50 border-green-200';
      case 'edit': return 'bg-blue-50 border-blue-200';
      case 'delete': return 'bg-red-50 border-red-200';
      case 'move': return 'bg-purple-50 border-purple-200';
      case 'assign': return 'bg-orange-50 border-orange-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Activity Log</h3>
        </div>
        <p className="text-xs text-gray-500 mt-1">Last 20 actions</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`border rounded-lg p-3 transition-all duration-200 hover:shadow-sm animate-fade-in ${getActionColor(activity.type)}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-2">
                <div className="flex-shrink-0 mt-0.5">
                  {getActionIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1 text-xs">
                    <User className="w-3 h-3 text-gray-400" />
                    <span className="font-medium text-gray-700 truncate">
                      {activity.user}
                    </span>
                    <span className="text-gray-500">{activity.action}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {activity.details}
                  </p>
                  <div className="flex items-center space-x-1 mt-2 text-xs text-gray-400">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{formatTimeAgo(activity.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Live updates enabled</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
