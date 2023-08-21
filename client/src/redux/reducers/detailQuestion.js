import {
  QUESTION_EDIT,
  END_QUESTION_EDIT,
  ANSWER_EDIT,
  END_ANSWER_EDIT,
  COMMENT_EDIT,
  END_COMMENT_EDIT
} from '../actions/detailQuestion';

export const questionReducer = (state = false, action) => {
  switch (action.type) {
    case QUESTION_EDIT:
      return action.payload;
    case END_QUESTION_EDIT:
      return action.payload;
    default:
      return state;
  }
};
export const answerReducer = (
  state = { target: null, flag: false },
  action
) => {
  switch (action.type) {
    case ANSWER_EDIT:
      return {
        target: action.payload.target,
        flag: action.payload.flag
      };
    case END_ANSWER_EDIT:
      return {
        target: action.payload.target,
        flag: action.payload.flag
      };
    default:
      return state;
  }
};
export const commentReducer = (
  state = { target: null, flag: false },
  action
) => {
  switch (action.type) {
    case COMMENT_EDIT:
      return {
        target: action.payload.target,
        flag: action.payload.flag
      };
    case END_COMMENT_EDIT:
      return {
        target: action.payload.target,
        flag: action.payload.flag
      };
    default:
      return state;
  }
};
