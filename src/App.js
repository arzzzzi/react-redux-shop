import React, { useState } from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

import './scss/app.scss';

function App() {
  const pizzas = [
    { title: 'Маргарита', price: 350 },
    { title: 'Четыре сыра', price: 550 },
    { title: 'Гавайская', price: 470 },
    { title: 'Чизбургер-пицца', price: 390 },
  ];

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((item, index) => (
              <PizzaBlock key={index} title={item.title} price={item.price} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
