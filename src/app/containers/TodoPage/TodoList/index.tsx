import 'rbx/index.css';
import React, { useEffect } from 'react';
import { TodoItem } from './components/TodoItem';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { actions, reducer, sliceKey } from './slice';
import { todosSaga } from './saga';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodos } from './selectors';

export function TodoList() {
  const todos = useSelector(selectTodos);
  useInjectReducer({ key: sliceKey, reducer });
  useInjectSaga({ key: sliceKey, saga: todosSaga });

  const dispatch = useDispatch();

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(actions.loadTodos());
  });
  return (
    <>
      {todos?.length > 0
        ? todos.map(todo => (
            <React.Fragment key={todo.uuid}>
              <TodoItem
                key={todo.uuid}
                uuid={todo.uuid}
                task={todo.task}
                done={todo.done}
                timestamp={todo.timestamp}
              />
            </React.Fragment>
          ))
        : []}
    </>
  );
}
