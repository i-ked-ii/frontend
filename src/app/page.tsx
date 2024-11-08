'use client';

import React, { useEffect, useRef, useState } from 'react';

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
  const timers = useRef(new Map<string, NodeJS.Timeout>());

  const startTimer = (item: ListArray, setTypeList: React.Dispatch<React.SetStateAction<ListArray[]>>) => {
    if (timers.current.has(item.name)) {
      clearTimeout(timers.current.get(item.name)!);
    }

    const timer = setTimeout(() => {
      setTypeList((prev) => prev.filter((i) => i.name !== item.name));
      setList((prev) => [...prev, item]);
      timers.current.delete(item.name);
    }, 5000);

    timers.current.set(item.name, timer);
  }

  const handleItemClick = (type: string, name: string) => {
    const newList = list.filter((item) => item.type !== type || item.name !== name);
    setList(newList);

    switch (type) {
      case 'Fruit':
        setFruitList([...fruitList, { type, name }]);
        startTimer({ type, name }, setFruitList);
        break;
      case 'Vegetable':
        setVegetableList([...vegetableList, { type, name }]);
        startTimer({ type, name }, setVegetableList);
        break;
    }
  }

  const handleItemRemoveToMain = (type: string, name: string) => {
    if (timers.current.has(name)) {
      clearTimeout(timers.current.get(name)!);
      timers.current.delete(name);
    }

    switch (type) {
      case 'Fruit':
        setFruitList((prev) => prev.filter((item) => item.name !== name));
        break;
      case 'Vegetable':
        setVegetableList((prev) => prev.filter((item) => item.name !== name));
        break;
    }

    setList((prev) => [...prev, { type, name }]);
  }

  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => clearTimeout(timer));
      timers.current.clear();
    };
  }, []);

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1 className="text-4xl font-bold">Fruit and Vegetable</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="trask-todo border border-gray-400">
          <div className="trask-vegetable__header p-4 border-b border-gray-400 text-center"><h2 className="text-2xl font-bold">To Do</h2></div>
          <ul className="list-none p-3 space-y-3">
            {list.map((item, index) => (
              <li
                aria-hidden="true"
                className='p-4 text-center border border-gray-300 cursor-pointer'
                key={index}
                onClick={() => handleItemClick(item.type, item.name)}
              >
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
                <li
                  aria-hidden="true"
                  className='p-4 text-center border border-gray-300 cursor-pointer'
                  key={index}
                  onClick={() => handleItemRemoveToMain(item.type, item.name)}
                >
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
                <li
                  aria-hidden="true"
                  className='p-4 text-center border border-gray-300 cursor-pointer'
                  key={index}
                  onClick={() => handleItemRemoveToMain(item.type, item.name)}
                >
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
