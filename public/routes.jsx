import React from 'react';
import Router from 'react-router';
import App from './views/app.jsx';

const { Route } = Router;

const routes = (
  <Route handler={App} />
)

export default routes;
