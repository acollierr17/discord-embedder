import { put, takeLatest, delay, call } from 'redux-saga/effects';
import { actions } from './slice';
import { reduxSagaFirebase } from '../../../firebase';
import { Todo } from './components/TodoItem/types';

export function* getTodos() {
  yield delay(500);

  try {
    const snapshot = yield call(
      reduxSagaFirebase.firestore.getCollection,
      'todos',
    );

    const todos = [];
    snapshot.forEach((user: any) => {
      // @ts-ignore
      todos.push({
        uuid: user.data().uuid,
        task: user.data().task,
        done: user.data().done,
        timestamp: user.data().timestamp.toMillis(),
      } as Todo);
    });

    const sorted = todos.sort(
      (a: Todo, b: Todo) => (b.timestamp as number) - (a.timestamp as number),
    );
    if (todos?.length > 0) yield put(actions.loadedTodos(sorted));
  } catch (err) {
    console.error(err);
  }
}

export function* todosSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadTodos.type, getTodos);
}
