import { styled } from 'styled-components';

export const CommentWrap = styled.div`
  border-bottom: 1px solid var(--white-10);
  font-size: 13px;
  padding: 6px;

  .comment-user {
    color: var(--blue-hover);
    margin-right: 5px;
  }

  .comment-date {
    color: var(--gray);
  }
  div {
    margin-top: 5px;
  }
  button {
    font-size: 13px;
    margin-right: 10px;
    color: var(--gray);
  }
`;
