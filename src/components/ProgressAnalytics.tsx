import React from 'react';
import { Task } from '../App';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';
import { BarChartIcon } from 'lucide-react';
type ProgressAnalyticsProps = {
  tasks: Task[];
};
export const ProgressAnalytics: React.FC<ProgressAnalyticsProps> = ({
  tasks
}) => {
  // Calculate stats
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;
  const successRate = tasks.length > 0 ? Math.round(completedTasks / tasks.length * 100) : 0;
  // Weekly progress - in a real app, this would be calculated from actual data
  const weeklyProgress = 65;
  // Mock data for weekly chart
  const data = [{
    day: 'M',
    tasks: 0
  }, {
    day: 'T',
    tasks: 2
  }, {
    day: 'W',
    tasks: 0
  }, {
    day: 'T',
    tasks: 4
  }, {
    day: 'F',
    tasks: 0
  }, {
    day: 'S',
    tasks: 0
  }, {
    day: 'S',
    tasks: 0
  }];
  return <div className="bg-white rounded-3xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <BarChartIcon className="text-blue-500" size={20} />
        <h2 className="text-2xl font-bold">Progress Analytics</h2>
      </div>
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-[#667eea]">
              {completedTasks}
            </p>
            <p className="text-gray-500">Completed</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-[#667eea]">{pendingTasks}</p>
            <p className="text-gray-500">Pending</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-[#667eea]">{successRate}%</p>
            <p className="text-gray-500">Success Rate</p>
          </div>
        </div>
        <h3 className="font-semibold mb-2">Weekly Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div className="bg-[#667eea] h-2.5 rounded-full" style={{
          width: `${weeklyProgress}%`
        }}></div>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          {weeklyProgress}% of weekly goals completed
        </p>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <Bar dataKey="tasks" fill="#667eea" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-between mt-2">
            {data.map((item, index) => <div key={index} className="text-center">
                <p className="text-gray-500">{index + 1}</p>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};