import { styled } from 'styled-components';

export const MainContainer = styled.div`
  margin: 2rem 0;

  .flex-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #e3e6e8;
    padding-bottom: 1.3rem;
  }

  h1 {
    padding-bottom: 2rem;
    font-size: 27px;
    font-weight: 500;
  }

  .questions-num {
    font-size: 17px;
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

  .list-item {
    margin: 0;
    padding: 1rem;
    border: 1px solid #000000;
    border-right: 0;
  }

`;
