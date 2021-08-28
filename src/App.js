import React, { lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

const Home = React.lazy(() => import('./views/Home'));
const Login = React.lazy(() => import('./views/Login'));
const Register = React.lazy(() => import('./views/Register'));
const NotFound = React.lazy(() => import('./views/Shared/notFound'));
const ViewError = React.lazy(() => import('./views/Shared/error'));
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
          <Route path="/notfound" component={NotFound} />
          <Route path="/error" component={ViewError} />
          <Redirect to="/notfound" from="*" />
          {/* <Route path="/" render={props => <Views match={props.match} />} />
          <Route path="/error" exact render={props => <ViewError match={props.match} />} />
          <Redirect to="/" /> */}
        </Switch>
      </Router>
    </Suspense>
  );
}
