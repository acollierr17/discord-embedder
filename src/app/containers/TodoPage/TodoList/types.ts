import { Todo } from './components/TodoItem/types';

/* --- STATE --- */
export interface TodoPageState {
  todos: Array<Todo>;
}

/*
  If you want to use 'ContainerState' keyword everywhere in your feature folder,
  instead of the 'HomePageState' keyword.
 */
export type ContainerState = TodoPageState;
