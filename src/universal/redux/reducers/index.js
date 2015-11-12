import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import {reducer as form} from 'redux-form';

import {reducer as appLoading} from './appLoading';
import {reducer as auth} from './auth';
import {reducer as projects} from './projects';

export default combineReducers({
  router: routerStateReducer,
  appLoading,
  auth,
  projects,
  form
});