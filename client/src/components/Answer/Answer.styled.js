import { styled } from 'styled-components';

export const AnswerWrap = styled.div`
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid var(--gray-10);
  align-items: flex-start;

  .answer-content-container {
    width: 100%;
  }
  .add-comment-btn {
    font-size: 13px;
    margin-right: 10px;
    color: var(--gray);
  }
`;

export const AnswerLikeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-right: 16px;

  button {
    background-color: var(--white);
    border: 1px solid var(--gray-10);
    width: 40px;
    height: 40px;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    font-size: 19px;
    font-weight: bold;
    padding: 4px 0px;
    margin: 2px;
  }

  img {
    width: 16px;
    height: 8px;
  }

  button:hover {
    background-color: #fce3cf;
  }
`;
export const CommentContainer = styled.div`
  margin-top: 12px;
  padding-bottom: 10px;
  border-top: 1px solid var(--gray-10);
`;

export const CommentForm = styled.div`
  > input {
    padding: 5px;
    border: 1px solid hsl(210, 8%, 75%);
    border-radius: 6px;
    font-size: 12px;
    width: 100%;
    margin: 8px 0;
    &:focus {
      border: 1px solid #59a4de;
      box-shadow: 0px 0px 0px 4px #d9eaf7;
      outline: none;
      transition: none;
    }
  }
`;
