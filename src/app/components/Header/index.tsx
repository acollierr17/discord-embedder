import 'rbx/index.css';
import React from 'react';

export function Header() {
  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title">Hello World</h1>
          <p className="subtitle">
            My first website with{' '}
            <strong>TypeScript, ReactJS, Redux, Bulma, and Firebase</strong>!
          </p>
          <p>
            This application is currently running in{' '}
            <b>{process.env.NODE_ENV}</b> mode.
          </p>
        </div>
      </section>
    </>
  );
}
