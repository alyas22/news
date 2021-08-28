import React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../header';
import Footer from '../../footer';
import { createBrowserHistory } from 'history';
import { alertActions } from '../../../../actions/user';
import '../../layouts/_style.scss';
import './_style.scss';

export default function RegisterAndLogin(props) {
  const { children, title } = props;
  const dispatch = useDispatch();
  const history = createBrowserHistory();
  const alert = useSelector(state => state.alert);

  history.listen((location, action) => {
    dispatch(alertActions.clear());
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="outer-container">
        {/* <Header />    */}
        <div className="container-root mainWrap">
          <div className="container d-flex justify-content-center">
            <div className="card p-5 mt-5">
              <div className="card-body mx-5 my-2">
                <h5 className="card-title text-center">{title}</h5>
                {alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
                <p className="card-text">{children}</p>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}
