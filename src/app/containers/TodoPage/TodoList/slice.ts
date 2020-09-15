import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ContainerState } from './types';
import { Todo } from './components/TodoItem/types';
import { todosCollection } from '../../../firebase';
import * as firebase from 'firebase/app';

export const initialState: ContainerState = {
  todos: [],
};

const todoPageSlice = createSlice({
  name: 'todoPage',
  initialState,
  reducers: {
    loadTodos(state) {
      state.todos = [];
    },
    loadedTodos(state, action: PayloadAction<Array<Todo>>) {
      state.todos = action.payload;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      const todo = {} as Todo;
      const result = todosCollection.doc();
      todo.uuid = result.id;
      todo.task = action.payload.task;
      todo.done = false;
      todo.timestamp = firebase.firestore.Timestamp.fromMillis(Date.now());

      todosCollection.doc(result.id).set(todo).then();
      todo.timestamp = todo.timestamp.toMillis();
      state.todos = [todo, ...state.todos];
    },
    deleteTodo(state, { payload: { uuid } }: PayloadAction<Todo>) {
      todosCollection.doc(uuid).delete().then();
      const todoInState = state.todos.find(todo => todo.uuid === uuid);
      state.todos = state.todos.filter(todo => todo !== todoInState);
    },
    markTodo(state, { payload: { uuid, done } }: PayloadAction<Todo>) {
      const timestamp = firebase.firestore.Timestamp.fromMillis(Date.now());
      const data = { done: !done, timestamp: timestamp as Todo['timestamp'] };
      todosCollection.doc(uuid).update(data).then();
      state.todos = state.todos.map(todo => {
        if (todo.uuid !== uuid) return todo;
        todo.timestamp = timestamp.toMillis();
        return { ...todo, done: !done, timestamp: timestamp.toMillis() };
      });
    },
  },
});

export const { actions, reducer, name: sliceKey } = todoPageSlice;
