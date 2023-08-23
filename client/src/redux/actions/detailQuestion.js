export const QUESTION_EDIT = 'QUESTION_EDIT';
export const END_QUESTION_EDIT = 'END_QUESTION_EDIT';
export const ANSWER_EDIT = 'ANSWER_EDIT';
export const END_ANSWER_EDIT = 'END_ANSWER_EDIT';
export const COMMENT_EDIT = 'COMMENT_EDIT';
export const END_COMMENT_EDIT = 'END_COMMENT_EDIT';

export const questionEdit = (payload) => {
  return { type: QUESTION_EDIT, payload };
};
export const endQuestionEdit = (payload) => {
  return { type: END_QUESTION_EDIT, payload };
};

export const answerEdit = (payload) => {
  return { type: ANSWER_EDIT, payload };
};
export const endAnswerEdit = (payload) => {
  return { type: END_ANSWER_EDIT, payload };
};

export const commentEdit = (payload) => {
  return { type: COMMENT_EDIT, payload };
};
export const endCommentEdit = (payload) => {
  return { type: END_COMMENT_EDIT, payload };
};
