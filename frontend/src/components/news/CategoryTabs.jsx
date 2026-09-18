import React from 'react';
import { CATEGORIES } from '../../data/mockData.js';

export const CategoryTabs = ({
  activeCategory = 'all',
  onSelectCategory,
  categories = CATEGORIES,
  className = '',
}) => {
  return (
    <div className={`nuzio-category-tabs-container ${className}`}>
      <div className="nuzio-category-tabs-track" role="tablist" aria-label="News categories">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => onSelectCategory?.(cat.id)}
              className={`nuzio-category-tab ${isActive ? 'nuzio-category-tab--active' : ''}`}
            >
              <span>{cat.label}</span>
              {isActive && <span className="nuzio-category-tab__indicator" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;
