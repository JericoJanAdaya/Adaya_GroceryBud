import React from 'react';
const List = ({ items }) => {
  return (
    <div className='grocery-list'>
      {items.map((item) => {
        const { index, title } = item;
        return (
          <article className='grocery-item' key={index}>
            <p className='title'>{title}</p>            
          </article>
        );
      })}
    </div>
  );
};

export default List;