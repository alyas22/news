
import React, { lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';


const Home = React.lazy(() => import('./views/Home'));
const Login = React.lazy(() => import('./views/Login'));
const Registre = React.lazy(() => import('./views/Registre'));
const Details = React.lazy(() => import('./views/Details'));
const NotFound = React.lazy(() => import('./views/Shared/notFound'));
const ViewError = React.lazy(() => import('./views/Shared/error'));

export default function App() {

  return (
    <Suspense fallback={<div className="loading" />}>
      <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/registre" component={Registre} />
            <Route path="/details/:id" component={Details} />
            <Route path="/notfound" component={NotFound} />
            <Route path="/error" component={ViewError} />
            <Redirect to="/notfound" from="*" />
        </Switch>
      </Router>
    </Suspense>
  );
}
