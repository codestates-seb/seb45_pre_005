import { styled } from 'styled-components';

export const QuestionCardContainer = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e3e6e8;
  width: 70%;

  a {
    display: flex;
  }

  span {
    margin: 0.2rem;
    color: #6a737c;
  }
  overflow: hidden;

  .question-info {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    color: #6a737c;
    padding: 0 1rem 0 2rem;
    flex-shrink: 0;
  }

  .question-title {
    font-size: 17px;
    color: #0074CC;
  }

  .question-contents {
    font-size: 13px;
    color: #3b4045;
  }
`;