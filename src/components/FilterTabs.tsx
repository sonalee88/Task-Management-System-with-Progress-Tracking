import React from 'react';
type FilterTabsProps = {
  activeFilter: 'All' | 'Today' | 'Upcoming' | 'Completed';
  onFilterChange: (filter: 'All' | 'Today' | 'Upcoming' | 'Completed') => void;
};
export const FilterTabs: React.FC<FilterTabsProps> = ({
  activeFilter,
  onFilterChange
}) => {
  const tabs: ('All' | 'Today' | 'Upcoming' | 'Completed')[] = ['All', 'Today', 'Upcoming', 'Completed'];
  return <div className="flex space-x-2 overflow-x-auto">
      {tabs.map(tab => <button key={tab} onClick={() => onFilterChange(tab)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === tab ? 'bg-[#667eea] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
          {tab}
        </button>)}
    </div>;
};