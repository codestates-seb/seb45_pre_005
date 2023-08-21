import { styled } from 'styled-components';

export const QuestionCardContainer = styled.div`
  padding: 1.3rem;
  border-bottom: 1px solid #e3e6e8;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: row;

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
    align-items: flex-end;
    font-size: 13px;
    color: #6a737c;
    padding: 0 1rem 0 2rem;
    flex-shrink: 0;
  }

  .question-main {
    width: 90%;
    display: flex;
    flex-direction: column;
  }

  .question-title {
    font-size: 17px;
    color: #0074CC;
  }

  .question-contents {
    width: 100%;
    font-size: 13px;
    margin: 0.3rem 0 0 0;
    color: #3b4045;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
    line-height: 17px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .author-info {
    display: flex;
    justify-content: flex-end;
  }

  span {
    font-size: 12px;
    color: #6a737c;
  }

  .author-nickname {
    color: #0074CC;
    font-size: 13px;
  }
`;