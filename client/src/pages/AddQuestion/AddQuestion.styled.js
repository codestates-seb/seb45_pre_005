import { styled } from 'styled-components';

export const AddQuestionContainer = styled.div`
  width: 100%;
  margin: 3rem 0;

  h1 {
    padding-bottom: 3rem;
    font-size: 27px;
    font-weight: 500;
  }

  button {
    font-size: 13px;
    background-color: #0a95ff;
    color: #ffffff;
    padding: 10px;
    border-radius: 7px;
    margin: 0 0.3rem;
    
    &:hover {
      background-color: #0074cc;
    }

    &:active {
      box-shadow: 0px 0px 0px 4px #d9eaf7;
    }

    &:disabled {
      background-color: #96caff;
      color: #ffffff;
      cursor: default;
      box-shadow: none;
    }
  }

  button.red-btn {
    background-color: #ffffff;
    color: #c22e32;

    &:hover {
      background-color: #fdf2f2;
    }

    &:active {
      background-color: #f9d2d3;
      box-shadow: rgba(194, 46, 50, 0.15) 0px 0px 0px 4px;
    }
  }

  .flex-box {
    margin: 2rem 0;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    box-sizing: border-box;
    position: relative;
  }
`;