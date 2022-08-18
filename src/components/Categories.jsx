import React, { useState } from 'react';

function Categories() {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const categoryClick = (index) => {
    setActiveCategory(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => categoryClick(index)}
              className={activeCategory === index ? 'active' : ''}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
