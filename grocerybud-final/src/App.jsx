import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert'
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
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const grocerySubmit = (e) => {
    e.preventDefault();
    if (!item) {
      showAlert(true, 'warning', 'please enter item');
    }
    else if (item && isEditing) {
      setList(
        list.map((itemName) => {
          if (itemName.id === editID) {
            return { ...itemName, title: item };
          }
          return itemName;
        })
      );
      setItem('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'confirm', 'item changed');
    }
    else {
      showAlert(true, 'confirm', 'item added');
      const newItem = { id: new Date().getTime().toString(), title: item };
      setList([...list, newItem]);
      setItem('');
    }        
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);
  const clearList = () => {
    showAlert(true, 'warning', 'list empty');
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, 'warning', 'item removed');
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setItem(specificItem.title);
  };
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };
  return (
    <section className='section-center'> 
      <h3>grocery bud</h3>
      <div className='underline'></div>     
      <form className='grocery-form' onSubmit={grocerySubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}        
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. milk'
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>
            clear items
          </button>         
        </div>
      )}       
    </section>    
  )
}

export default App;