/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';
export const ADD_SCOUT = 'wreath/app/containers/App/ADD_SCOUT';
export const REMOVE_SCOUT = 'wreath/app/containers/App/REMOVE_SCOUT';
export const CHANGE_NEW_USERNAME = 'wreath/app/containers/App/CHANGE_NEW_USERNAME';
export const CHANGE_NEW_SALE = 'wreath/app/containers/App/CHANGE_NEW_SALE';
export const SUBMIT_BUTTON = 'wreath/app/containers/App/SUBMIT_BUTTON';