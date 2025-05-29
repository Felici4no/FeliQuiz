import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { mockTopics } from '../data/mockData';
import QuizCard from '../components/QuizCard';
import TopicFilter from '../components/TopicFilter';
import CategoryFilter from '../components/CategoryFilter';
import { Quiz } from '../types';

const QuizList: React.FC = () => {
  const location = useLocation();
  const { quizzes } = useQuiz();
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>(quizzes);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Parse URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [location]);

  // Apply filters
  useEffect(() => {
    let filtered = [...quizzes];
    
    if (selectedCategory) {
      filtered = filtered.filter(quiz => quiz.category === selectedCategory);
    }
    
    if (selectedTopic) {
      const topic = mockTopics.find(t => t.id === selectedTopic);
      if (topic) {
        filtered = filtered.filter(quiz => quiz.topic === topic.name);
        
        if (selectedSubtopic) {
          const subtopic = topic.subtopics.find(s => s.id === selectedSubtopic);
          if (subtopic) {
            filtered = filtered.filter(quiz => quiz.subtopic === subtopic.name);
          }
        }
      }
    }
    
    setFilteredQuizzes(filtered);
  }, [quizzes, selectedCategory, selectedTopic, selectedSubtopic]);

  const handleTopicFilter = (topicId: string, subtopicId?: string) => {
    setSelectedTopic(topicId);
    setSelectedSubtopic(subtopicId || '');
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Browse Quizzes</h1>
      
      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onCategoryChange={handleCategoryChange} 
      />
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4">
          <TopicFilter 
            topics={mockTopics} 
            onFilterChange={handleTopicFilter} 
          />
        </div>
        
        <div className="md:w-3/4">
          {filteredQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuizzes.map(quiz => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          ) : (
            <div className="fb-card text-center py-8">
              <p className="text-lg">No quizzes found matching your filters.</p>
              <button 
                className="fb-button mt-4"
                onClick={() => {
                  setSelectedTopic('');
                  setSelectedSubtopic('');
                  setSelectedCategory('');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizList;