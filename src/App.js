import React, { lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

const Home = React.lazy(() => import('./views/Home'));
const Login = React.lazy(() => import('./views/Login'));
const Register = React.lazy(() => import('./views/Register'));
const MyNews = React.lazy(() => import('./views/myNews'));

export default function App() {
  return (
    <Suspense fallback={<div className="loader" />}>
      <Router>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/mylist" component={MyNews} />
        </Switch>
      </Router>
    </Suspense>
  );
}
