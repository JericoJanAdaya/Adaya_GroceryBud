import React, { useState, useEffect } from 'react';
import List from './List';
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};
function App() {
  const [item, setItem] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const grocerySubmit = (e) => {
    e.preventDefault();
    const newItem = { id: new Date().getTime().toString(), title: item };
    setList([...list, newItem]);
    setItem('');    
  };
  const clearList = () => {
    setList([]);
  };
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);
  return (
    <section className='section-center'>
      <h3>grocery bud</h3>
      <div className='underline'></div>
      <form className='grocery-form' onSubmit={grocerySubmit}>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. milk'
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            submit
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} />
          <button className='clear-btn' onClick={clearList}>
            clear items
          </button>         
        </div>
      )}       
    </section>    
  )
}

export default App;