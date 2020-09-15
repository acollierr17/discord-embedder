import { RootState } from '../../../../types';
import { initialState } from './slice';
import { createSelector } from '@reduxjs/toolkit';

const selectDomain = (state: RootState) => state?.todoPage || initialState;

export const selectTodos = createSelector(
  [selectDomain],
  todoListState => todoListState.todos,
);
