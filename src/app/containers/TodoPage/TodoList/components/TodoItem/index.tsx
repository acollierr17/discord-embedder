/* eslint-disable jsx-a11y/anchor-is-valid */
import 'rbx/index.css';
import React from 'react';
import styled from 'styled-components/macro';
import { Todo } from './types';
import { useDispatch } from 'react-redux';
import { actions } from '../../slice';
import styles from './todo.module.css';

export function TodoItem({ done, task, uuid }: Todo) {
  const dispatch = useDispatch();
  const deleteTheTodo = e => {
    e.preventDefault();
    const confirmed = window.confirm('Are you sure?');
    if (confirmed.valueOf()) dispatch(actions.deleteTodo({ uuid } as Todo));
  };
  const markTheTodo = e => {
    e.preventDefault();
    dispatch(actions.markTodo({ uuid, done } as Todo));
  };
  return (
    <div className="Todo">
      <div className="container">
        <div className="card">
          <div className="card-content">
            <p className="title">{task}</p>
            <p className="subtitle">{uuid}</p>
          </div>
          <footer className="card-footer">
            <p className="card-footer-item">
              <span>
                <ButtonText
                  className={done ? styles.redButton : styles.greenButton}
                  onClick={markTheTodo}
                >
                  Mark as {done ? 'Not Done' : 'Done'}
                </ButtonText>
              </span>
            </p>
            <p className="card-footer-item">
              <span>
                <ButtonText
                  className={styles.redButton}
                  onClick={deleteTheTodo}
                >
                  Delete Task
                </ButtonText>
              </span>
            </p>
          </footer>
        </div>
        <br />
      </div>
    </div>
  );
}

const ButtonText = styled.a`
  font-family: Roboto Mono, monospace;
  font-weight: bold;
  font-size: 24px;
`;
