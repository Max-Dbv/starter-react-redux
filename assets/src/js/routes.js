import React from 'react';
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router';

// Base component
import App from './components/app';

// 404
import NotFound from './components/parts/notfound';

export default (
  <Route path="/" component={App}>
    {/* 404 handling*/}
    <Route path="*" component={NotFound} name="Not found"/>
  </Route>
);
