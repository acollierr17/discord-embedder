import * as firebase from 'firebase';
import 'firebase/database';

export interface Todo {
  uuid: string;
  task: string;
  done: boolean;
  timestamp: firebase.firestore.Timestamp | number;
}
