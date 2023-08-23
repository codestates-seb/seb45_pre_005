export const allData = {
  data: {
    memberId: 1,
    questionId: 1,
    nickname: 'test',
    title: 'question_test',
    content: '<div><p>question <b>testing</b><p></div>',
    viewCount: 1,
    createdAt: '2023-08-19T17:26:54.328972',
    modifiedAt: '2023-08-19T17:27:01.260417'
  },
  list: [
    {
      memberId: 1,
      answerId: 1,
      nickname: 'test',
      title: 'answer_test1',
      content: 'answer_test1',
      createAt: '2023-08-18T14:30:46.777941',
      comments: [
        {
          memberId: 1,
          commentId: 1,
          nickname: 'test',
          content: 'comment_test1',
          createAt: '2023-08-18T14:42:56.565496'
        },
        {
          memberId: 2,
          commentId: 2,
          nickname: 'test2',
          content: 'comment_test2',
          createAt: '2023-08-18T14:42:56.565496'
        },
        {
          memberId: 1,
          commentId: 4,
          nickname: 'test',
          content: 'comment_test4',
          createAt: '2023-08-18T14:42:56.565496'
        }
      ]
    },
    {
      memberId: 1,
      answerId: 3,
      nickname: 'test',
      title: 'answer_test2',
      content: 'answer_test2',
      createAt: '2023-08-18T14:30:46.777941',
      comments: []
    },
    {
      memberId: 2,
      answerId: 2,
      nickname: 'test2',
      title: 'answer_test3',
      content: 'answer_test3',
      createAt: '2023-08-18T14:30:46.777941',
      comments: [
        {
          memberId: 3,
          commentId: 3,
          nickname: 'test3',
          content: 'comment_test3',
          createAt: '2023-08-18T14:42:56.565496'
        }
      ]
    }
  ]
};

export const noCommentData = {
  data: {
    questionId: 2,
    nickname: 'test',
    title: 'question_test',
    content: 'question_testing',
    viewCount: 1,
    createdAt: '2023-08-19T17:26:54.328972',
    modifiedAt: '2023-08-19T17:27:01.260417'
  },
  list: [
    {
      nickname: 'test',
      title: 'answer_test',
      content: 'answer_test',
      createAt: '2023-08-18T14:30:46.777941',
      comments: []
    },
    {
      nickname: 'test',
      title: 'answer_test',
      content: 'answer_test',
      createAt: '2023-08-18T14:30:46.777941',
      comments: []
    }
  ]
};

export const noAnswerData = {
  data: {
    questionId: 2,
    nickname: 'test',
    title: 'question_test',
    content: 'question_testing',
    viewCount: 1,
    createdAt: '2023-08-19T17:26:54.328972',
    modifiedAt: '2023-08-19T17:27:01.260417'
  },
  list: []
};
