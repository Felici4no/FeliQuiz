import React from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: '', label: 'Todos' },
    { id: 'entertainment', label: 'Pra se divertir' },
    { id: 'thinking', label: 'Pra pensar' },
    { id: 'self-discovery', label: 'Pra se conhecer' },
    { id: 'expression', label: 'Pra se expressar' },
    { id: 'competition', label: 'Pra competir' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map(category => (
        <button
          key={category.id}
          className={`px-3 py-1.5 rounded-full text-sm transition ${
            selectedCategory === category.id 
              ? 'bg-fb-blue text-white' 
              : 'bg-white border border-fb-border hover:bg-gray-100'
          }`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;