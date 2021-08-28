import { combineReducers } from 'redux';
import { loginAndLogout } from './loginAndLogout';
import { registration } from './registration';
import { saveNews } from './saveNews';
// import { users } from './users';
import { alert } from './alert';

const rootReducer = combineReducers({
  loginAndLogout,
  registration,
  saveNews,
  alert,
});

export default rootReducer;
