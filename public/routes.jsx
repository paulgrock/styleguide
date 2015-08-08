import React from 'react';
import Router from 'react-router';
import App from './views/app';

const { Route } = Router;

const routes = (
  <Route handler={App} />
)

export default routes;
