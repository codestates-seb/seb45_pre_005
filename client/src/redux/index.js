import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { loginReducer } from './reducers/loginInfoReducer';
import {
  questionReducer,
  answerReducer,
  commentReducer
} from './reducers/detailQuestion';
export const store = createStore(
  combineReducers({
    loginReducer,
    questionReducer,
    answerReducer,
    commentReducer
  }),
  applyMiddleware(thunk)
);
