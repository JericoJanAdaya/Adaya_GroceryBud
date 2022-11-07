import React, { useState, useEffect } from 'react';
function App() {
  const [item, setItem] = useState('');
  return (
    <section className='section-center'>
      <h3>grocery bud</h3>
      <div className='underline'></div>
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
    </section>    
  )
}

export default App;