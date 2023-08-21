import { styled } from 'styled-components';

export const QuestionGuideContainer = styled.div`
  background-color: #EBF4FB;
  border: 1px solid #a6ceed;
  padding: 1rem;
  font-size: 15px;
  font-weight: 300;
  border-radius: 10px;
  width: 70%;

  h2 {
    font-size: 21px;
    font-weight: 500;
    margin: 0.5rem 0;
  }

  h5 {
    font-size: 13px;
    font-weight: 600;
    margin: 1rem 0 0.5rem 0;
  }

  ul {
    padding: 0 2rem;
  }

  li {
    font-size: 13px; 
    list-style: disc;
  }
  span {
    font-weight: 500;
    color: #0074CC;
  }
`;