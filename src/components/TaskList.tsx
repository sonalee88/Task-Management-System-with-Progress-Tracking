import React from 'react';
import { Task } from '../App';
import { CheckCircleIcon } from 'lucide-react';
type TaskListProps = {
  tasks: Task[];
  onToggleCompletion: (id: string) => void;
};
export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleCompletion
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Medium':
        return 'bg-orange-100 text-orange-700';
      case 'Low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  return <div className="space-y-3 mt-6">
      {tasks.length === 0 ? <p className="text-center text-gray-500 py-4">No tasks found</p> : tasks.map(task => <div key={task.id} className={`flex items-center p-3 border-b ${task.completed ? 'bg-gray-50' : 'bg-white'}`}>
            <div onClick={() => onToggleCompletion(task.id)} className="cursor-pointer mr-3">
              {task.completed ? <div className="bg-[#667eea] text-white rounded-md p-1">
                  <CheckCircleIcon size={18} />
                </div> : <div className="w-6 h-6 border-2 border-gray-300 rounded-md"></div>}
            </div>
            <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </div>)}
    </div>;
};