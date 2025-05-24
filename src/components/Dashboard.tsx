import React, { useState } from 'react';
import { Task } from '../App';
import { TaskList } from './TaskList';
import { FilterTabs } from './FilterTabs';
import { ClipboardIcon } from 'lucide-react';
type DashboardProps = {
  tasks: Task[];
  onToggleCompletion: (id: string) => void;
  onAddTask: (title: string, priority: 'High' | 'Medium' | 'Low') => void;
};
export const Dashboard: React.FC<DashboardProps> = ({
  tasks,
  onToggleCompletion,
  onAddTask
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Today' | 'Upcoming' | 'Completed'>('All');
  const [newTask, setNewTask] = useState('');
  const filteredTasks = tasks.filter(task => {
    switch (activeFilter) {
      case 'Completed':
        return task.completed;
      case 'Today':
        // In a real app, you'd filter by today's date
        return !task.completed;
      case 'Upcoming':
        // In a real app, you'd filter by future dates
        return !task.completed;
      default:
        return true;
    }
  });
  const handleAddTask = () => {
    if (newTask.trim()) {
      // Randomly assign priority for demo purposes
      const priorities: ('High' | 'Medium' | 'Low')[] = ['High', 'Medium', 'Low'];
      const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
      onAddTask(newTask, randomPriority);
      setNewTask('');
    }
  };
  return <div className="bg-white rounded-3xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <ClipboardIcon className="text-pink-500" size={20} />
        <h2 className="text-2xl font-bold">Main Dashboard</h2>
      </div>
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-[#667eea]">TaskFlow</h3>
          <div className="w-10 h-10 bg-[#667eea] rounded-full"></div>
        </div>
        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <TaskList tasks={filteredTasks} onToggleCompletion={onToggleCompletion} />
        <div className="flex mt-4">
          <input type="text" placeholder="Add a new task..." value={newTask} onChange={e => setNewTask(e.target.value)} className="flex-1 py-2 px-4 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#667eea]" onKeyPress={e => e.key === 'Enter' && handleAddTask()} />
          <button className="bg-[#667eea] text-white py-2 px-4 rounded-r-lg hover:bg-[#5a6fd6]" onClick={handleAddTask}>
            Add
          </button>
        </div>
      </div>
    </div>;
};