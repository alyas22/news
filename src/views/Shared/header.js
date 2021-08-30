import React from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../actions/user';

export default function Header() {
  const dispatch = useDispatch();
  const user = localStorage.getItem('user');
  const parseUser = JSON.parse(user);

  const logOut = e => {
    dispatch(userActions.logout());
    window.location.href = 'home';
  };

  return (
    <>
      <header className="site-header text-center  mb-0">
        <div className="menu-container row align-items-center container-fluid mx-auto">
          <div className="row  menus  mr-auto mr-lg-0  mt-16 mt-lg-0">
            <span className="col-md-2 site-name">
              <a href="/">News</a>
            </span>
            {parseUser ? (
              <span className="col-md-4 site-menu">
                <a className={window.location.pathname === '/mylist' ? 'active' : ''} href="/mylist">
                  My List
                </a>
              </span>
            ) : (
              <span className="col-md-4" />
            )}
            <ul className=" col-md-6 d-flex justify-content-end list-unstyled align-items-center ">
              {parseUser?.name ? (
                <>
                  <li className="nav-item px-3">Hi {parseUser?.name} !</li>{' '}
                  <li className="nav-item">
                    <button type="button" onClick={logOut} className="btn btn-primary">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/register">
                      Register
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}
