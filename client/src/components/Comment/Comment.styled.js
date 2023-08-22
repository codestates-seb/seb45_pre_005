import { styled } from 'styled-components';

export const CommentWrap = styled.div`
  border-bottom: 1px solid var(--white-10);
  font-size: 13px;
  padding: 6px;
  font-size: 12px;

  .comment-user {
    color: var(--blue-hover);
    margin-right: 5px;
  }

  .comment-date {
    color: var(--gray);
  }
  .disable-msg {
    font-size: 11px;
    color: red;
  }
  div {
    margin: 8px 0;
  }
  button {
    margin-right: 10px;
    color: var(--gray);
  }

  button:hover {
    color: var(--gray-20);
  }

  .submit-btn {
    color: var(--blue);
  }

  .submit-btn:disabled {
    color: var(--gray);
    cursor: not-allowed;
  }

  > input {
    padding: 5px;
    border: 1px solid hsl(210, 8%, 75%);
    border-radius: 6px;
    font-size: 12px;
    width: 100%;
    margin-top: 8px;
    &:focus {
      border: 1px solid #59a4de;
      box-shadow: 0px 0px 0px 4px #d9eaf7;
      outline: none;
      transition: none;
    }
  }
`;
