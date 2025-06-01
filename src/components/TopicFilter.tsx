import React, { useState, useEffect } from 'react';
import { Topic } from '../types';

interface Props {
  topics: Topic[];
  onFilterChange: (topic: string, subtopic?: string) => void;
}

const TopicFilter: React.FC<Props> = ({ topics, onFilterChange }) => {
  const [selectedType, setSelectedType] = useState('todos');
  const [selectedSub, setSelectedSub] = useState('todos');
  const [showSubs, setShowSubs] = useState(false);

  useEffect(() => {
    const hasSubs = (topics.find(t => t.id === selectedType)?.subtopics?.length ?? 0) > 0;
    setShowSubs(selectedType !== 'todos' && hasSubs);
    if (selectedType === 'todos') {
      onFilterChange('');
    } else {
      onFilterChange(selectedType, selectedSub === 'todos' ? undefined : selectedSub);
    }
  }, [selectedType, selectedSub, topics, onFilterChange]);

  const handleSub = (id: string) => {
    setSelectedSub(id);
  };

  return (
    <div className="fb-card p-4">
      <h3 className="mb-2 font-semibold">Filter Quizzes</h3>

      <div className="flex flex-wrap gap-2 mb-2">
        <button
          className={`px-4 py-2 text-sm rounded ${selectedType === 'todos' ? 'bg-fb-blue text-white' : 'bg-gray-100 text-fb-blue hover:bg-gray-200'}`}
          onClick={() => setSelectedType('todos')}
        >Todos</button>
        {topics.map(t => (
          <button
            key={t.id}
            className={`px-4 py-2 text-sm rounded ${selectedType === t.id ? 'bg-fb-blue text-white' : 'bg-gray-100 text-fb-blue hover:bg-gray-200'}`}
            onClick={() => setSelectedType(t.id)}
          >{t.name}</button>
        ))}
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${showSubs ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-1 text-sm rounded ${selectedSub === 'todos' ? 'bg-fb-blue text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            onClick={() => handleSub('todos')}
          >Todos</button>
          {showSubs &&
            topics.find(t => t.id === selectedType)?.subtopics.map(st => (
              <button
                key={st.id}
                className={`px-3 py-1 text-sm rounded transition ${selectedSub === st.id ? 'bg-fb-blue text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                onClick={() => handleSub(st.id)}
              >{st.name}</button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TopicFilter;