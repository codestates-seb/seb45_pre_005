import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { exampleReducer } from './reducers';
import { loginReducer } from './reducers/loginInfoReducer'

export const store = createStore(
  combineReducers({
    exampleReducer, loginReducer
  }),
  applyMiddleware(thunk)
);
