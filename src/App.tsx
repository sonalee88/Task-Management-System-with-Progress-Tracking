import React, { useEffect, useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { ProgressAnalytics } from './components/ProgressAnalytics';
import { MobileView } from './components/MobileView';
export type Task = {
  id: string;
  title: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  dueDate?: Date;
  completedAt?: Date;
};
export function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [{
      id: '1',
      title: 'Review quarterly reports',
      completed: false,
      priority: 'High'
    }, {
      id: '2',
      title: 'Update project documentation',
      completed: true,
      priority: 'Medium'
    }, {
      id: '3',
      title: 'Team standup meeting',
      completed: false,
      priority: 'Low'
    }];
  });
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  const addTask = (title: string, priority: 'High' | 'Medium' | 'Low' = 'Medium') => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      priority
    };
    setTasks([...tasks, newTask]);
  };
  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? {
      ...task,
      completed: !task.completed,
      completedAt: !task.completed ? new Date() : undefined
    } : task));
  };
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  return <div className="min-h-screen bg-[#667eea] text-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-2">
            TaskFlow UI/UX Design System
          </h1>
          <p className="text-xl">
            Modern task management with intuitive user experience
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Dashboard tasks={tasks} onToggleCompletion={toggleTaskCompletion} onAddTask={addTask} />
          <ProgressAnalytics tasks={tasks} />
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <MobileView tasks={tasks} onToggleCompletion={toggleTaskCompletion} />
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-pink-100 p-1 rounded">🎨</span>
              <h2 className="text-2xl font-bold">Design System</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Color Palette</h3>
              <div className="flex gap-4 mb-8">
                <div className="w-12 h-12 rounded bg-[#667eea]" title="#667eea"></div>
                <div className="w-12 h-12 rounded bg-[#764ba2]" title="#764ba2"></div>
                <div className="w-12 h-12 rounded bg-[#2d3748]" title="#2d3748"></div>
                <div className="w-12 h-12 rounded bg-[#4a5568]" title="#4a5568"></div>
              </div>
              <h3 className="font-semibold mb-4">Typography</h3>
              <div className="space-y-2">
                <p className="text-3xl font-bold">Heading Large</p>
                <p className="text-xl font-semibold">Heading Medium</p>
                <p className="text-base">Body Text Regular</p>
                <p className="text-sm text-gray-500">Caption Text</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}