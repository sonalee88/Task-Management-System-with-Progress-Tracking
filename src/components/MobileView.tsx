import React from 'react';
import { Task } from '../App';
import { SmartphoneIcon, CheckCircleIcon, PlusIcon } from 'lucide-react';
type MobileViewProps = {
  tasks: Task[];
  onToggleCompletion: (id: string) => void;
};
export const MobileView: React.FC<MobileViewProps> = ({
  tasks,
  onToggleCompletion
}) => {
  // Filter for today's tasks - in a real app, this would filter by actual date
  const todayTasks = tasks.slice(0, 2);
  return <div className="bg-white rounded-3xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <SmartphoneIcon className="text-indigo-500" size={20} />
        <h2 className="text-2xl font-bold">Mobile Interface</h2>
      </div>
      <div className="max-w-[280px] mx-auto bg-gray-50 rounded-3xl p-4 shadow-lg">
        <div className="bg-white rounded-3xl p-4 shadow-sm relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-[#667eea]">TaskFlow</h3>
            <span className="text-sm text-gray-500">Today</span>
          </div>
          <div className="mb-6">
            <p className="text-lg font-bold">Good morning! 👋</p>
            <p className="text-gray-500">
              You have {todayTasks.length} tasks for today
            </p>
          </div>
          <div className="space-y-4">
            {todayTasks.map(task => <div key={task.id} className={`bg-white p-4 rounded-xl shadow-sm ${task.completed ? 'opacity-75' : ''}`}>
                <div className="flex items-start">
                  <div onClick={() => onToggleCompletion(task.id)} className="cursor-pointer mr-3 mt-1">
                    {task.completed ? <div className="bg-[#667eea] text-white rounded-md p-1">
                        <CheckCircleIcon size={16} />
                      </div> : <div className="w-5 h-5 border-2 border-gray-300 rounded-md"></div>}
                  </div>
                  <div className="flex-1">
                    <p className={`${task.completed ? 'line-through text-gray-500' : 'font-medium'}`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {task.completed ? 'Completed 1h ago' : 'Due in 2 hours'}
                    </p>
                  </div>
                </div>
              </div>)}
          </div>
          <div className="absolute bottom-4 right-4">
            <button className="w-12 h-12 bg-[#667eea] rounded-full flex items-center justify-center text-white shadow-lg">
              <PlusIcon size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>;
};