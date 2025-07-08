
import React from 'react';
import { AlertTriangle, Users, Clock } from 'lucide-react';

interface ConflictModalProps {
  conflictData: any;
  onResolve: () => void;
  onClose: () => void;
}

const ConflictModal = ({ conflictData, onResolve, onClose }: ConflictModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl animate-scale-in">
        <div className="flex items-center space-x-3 p-6 border-b border-gray-200 bg-yellow-50 rounded-t-xl">
          <AlertTriangle className="w-6 h-6 text-yellow-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Conflict Detected
          </h3>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Another user has modified this task while you were editing it. Please choose how to resolve the conflict:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
              <div className="flex items-center space-x-2 mb-3">
                <Users className="w-4 h-4 text-blue-600" />
                <h4 className="font-medium text-blue-900">Your Version</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Title:</span> Your task title</p>
                <p><span className="font-medium">Status:</span> In Progress</p>
                <p><span className="font-medium">Priority:</span> High</p>
              </div>
            </div>

            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="w-4 h-4 text-green-600" />
                <h4 className="font-medium text-green-900">Server Version</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Title:</span> Server task title</p>
                <p><span className="font-medium">Status:</span> Done</p>
                <p><span className="font-medium">Priority:</span> Medium</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onResolve}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Keep My Version
            </button>
            <button
              onClick={onResolve}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              Use Server Version
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConflictModal;
