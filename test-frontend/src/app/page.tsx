'use client';

import React, { useEffect, useState } from 'react';

type ListArray = {
  type: string;
  name: string;
};

const defaultList: ListArray[] = [
  { type: 'Fruit', name: 'Apple' },
  { type: 'Vegetable', name: 'Broccoli' },
  { type: 'Vegetable', name: 'Mushroom' },
  { type: 'Fruit', name: 'Banana' },
  { type: 'Vegetable', name: 'Tomato' },
  { type: 'Fruit', name: 'Orange' },
  { type: 'Fruit', name: 'Mango' },
  { type: 'Fruit', name: 'Pineapple' },
  { type: 'Vegetable', name: 'Cucumber' },
  { type: 'Fruit', name: 'Watermelon' },
  { type: 'Vegetable', name: 'Carrot' },
];

export default function Home() {
  const [list, setList] = useState<ListArray[]>(defaultList);
  const [fruitList, setFruitList] = useState<ListArray[]>([]);
  const [vegetableList, setVegetableList] = useState<ListArray[]>([]);

  const handleItemClick = (type: string, name: string) => {
    const newList = list.filter((item) => item.type !== type || item.name !== name);
    setList(newList);
    switch (type) {
      case 'Fruit':
        setFruitList([...fruitList, { type, name }]);
        break;
      case 'Vegetable':
        setVegetableList([...vegetableList, { type, name }]);
        break;
    }
  }

  const handleItemRemoveToMain = (type: string, name: string) => {
    switch (type) {
      case 'Fruit':
        setFruitList(fruitList.filter((item) => item.name !== name));
        setList([...list, { type, name }]);
        break;
      case 'Vegetable':
        setVegetableList(vegetableList.filter((item) => item.name !== name));
        setList([...list, { type, name }]);
        break;
    }
  }

  useEffect(() => {
    let timeLeft = 5;
    if (vegetableList.length > 0 && fruitList.length > 0) {
      const interval = setInterval(() => {
        if (timeLeft === 0) {
          setFruitList([]);
          setVegetableList([]);
          setList(defaultList);
          clearInterval(interval);
        }
        timeLeft -= 1;
      }, 1000);
    }
  }, [vegetableList, fruitList]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="grid grid-cols-3 gap-4">
          <div className="trask-todo border border-gray-400">
            <div className="trask-vegetable__header p-4 border-b border-gray-400 text-center"><h2 className="text-2xl font-bold">To Do</h2></div>
            <ul className="list-none p-3 space-y-3">
              {list.map((item, index) => (
                <li aria-hidden="true" className='p-4 text-center border border-gray-300' key={index} onClick={() => handleItemClick(item.type, item.name)}>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="trask-fruit border border-gray-400">
            <div className="trask-vegetable__header p-4 border-b border-gray-400 text-center"><h2 className="text-2xl font-bold">Fruit</h2></div>
            {fruitList.length > 0 && (
              <ul className="list-none p-3 space-y-3">
                {fruitList.map((item, index) => (
                  <li aria-hidden="true" className='p-4 text-center border border-gray-300' key={index} onClick={() => handleItemRemoveToMain(item.type, item.name)}>
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="trask-vegetable border border-gray-400">
            <div className="trask-vegetable__header p-4 border-b border-gray-400 text-center"><h2 className="text-2xl font-bold">Vegetable</h2></div>
            {vegetableList.length > 0 && (
              <ul className="list-none p-3 space-y-3">
                {vegetableList.map((item, index) => (
                  <li aria-hidden="true" className='p-4 text-center border border-gray-300' key={index} onClick={() => handleItemRemoveToMain(item.type, item.name)}>
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
