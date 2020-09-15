import 'rbx/index.css';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { TodoForm } from './TodoList/components/TodoForm';
import { TodoList } from './TodoList';
export function TodoPage() {
  return (
    <>
      <Helmet>
        <title>Todo Page</title>
        <meta name="description" content="Add a new todo" />
      </Helmet>
      <section className="section">
        <TodoForm />
        <br />
        <TodoList />
      </section>
    </>
  );
}
