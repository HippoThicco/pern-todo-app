import './App.css';
import React, { Fragment, useState, useEffect } from 'react';

//components

import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';
import Login from './components/Login';

function App() {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);

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
    if (user) getTodos();
  }, [user]);

  return (
    <Fragment>
      <div className="container">
        {!user ? (
          <Login setUser={setUser} />
        ) : (
          <>
            {' '}
            <h4 className="text-center mt-3">Logged in as {user.username}</h4>
            <InputTodo setTodos={setTodos} />
            <ListTodos todos={todos} setTodos={setTodos} />
          </>
        )}
      </div>
    </Fragment>
  );
}

export default App;
