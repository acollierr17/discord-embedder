import 'rbx/index.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../slice';
import { Todo } from './TodoItem/types';

export function TodoForm() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const createTodo = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (!value.trim()) return;
    const item = { task: value };
    dispatch(actions.addTodo(item as Todo));
    setValue('');
  };
  return (
    <div className="container">
      <form onSubmit={createTodo}>
        <div className="label">Add Todo</div>
        <div className="control">
          <input
            type="text"
            className="input"
            value={value}
            required={true}
            onChange={e => setValue(e.target.value)}
          />
        </div>
        <br />
        <button className="button is-success" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
