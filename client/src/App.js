import './App.css';
import React, { Fragment, useState, useEffect } from 'react';

//components

import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';

function App() {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/todos');
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <div className="container">
        <InputTodo setTodos={setTodos} />
        <ListTodos todos={todos} setTodos={setTodos} />
      </div>
    </Fragment>
  );
}

export default App;
