import { combineReducers } from 'redux';
import { loginAndLogout } from './loginAndLogout';
import { registration } from './registration';
import { saveAndDeleteNews } from './saveAndDeleteNews';
import { alert } from './alert';

const rootReducer = combineReducers({
  loginAndLogout,
  registration,
  saveAndDeleteNews,
  alert,
});

export default rootReducer;
