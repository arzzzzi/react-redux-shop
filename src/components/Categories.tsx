import React from 'react';

type CategoriesProps = {
  value: number;
  onClickCategory: (index: number) => void;
};

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((item, idx) => (
          <li
            key={idx}
            onClick={() => onClickCategory(idx)}
            className={value === idx ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
