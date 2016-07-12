/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
    LOAD_REPOS_SUCCESS,
    LOAD_REPOS,
    LOAD_REPOS_ERROR,
    ADD_SCOUT,
    REMOVE_SCOUT,
    CHANGE_NEW_USERNAME,
    CHANGE_NEW_SALE,
    SUBMIT_BUTTON,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  scouts2: {default: {year: 0, sales: []}, DuncanVogel: {year: 2015, sales: [{type: 'Small', num: 1}, {type: 'Medium', num: 2}]}},
  new_scout: {name: null, sales: {}},
  userData: fromJS({
    repositories: false,
  }),
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
          .set('loading', true)
          .set('error', false)
          .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
          .setIn(['userData', 'repositories'], action.repos)
          .set('loading', false)
          .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state
          .set('error', action.error)
          .set('loading', false);
    case CHANGE_NEW_USERNAME:
      return state
          .set('new_scout', state.get('new_scout').set('name', action.name));
    case ADD_SCOUT:
      return state
          .set('scouts2', state.get('scouts2').set(state.get('new_scout').get(name), {year: 2016, sales: state.get('new_scout').get(sales)}))
          .set('new_scout', {name: null, sales: {}});
    ////////////////
    case CHANGE_NEW_SALE:
      return state
          .set('new_scout', state.get('new_scout').get('sales').set(action.id, action.num));
    case REMOVE_SCOUT:
      return state
          .set('scouts2', state.get('scouts2').delete(action.scout.name));
    default:
      return state;
  }
}

export default appReducer;
