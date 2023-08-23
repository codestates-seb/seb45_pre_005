import { styled } from 'styled-components';

export const UserProfileConatiner = styled.div`
  margin: 1rem 0.5rem 1rem 1rem;

  .flex-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .flex-direction-row {
    display: flex;
    flex-direction: row;
  }

  .left-box {
    display: flex;
    flex-direction: row;
  }

  .user-nickname {
    font-size: 34px;
  }
  
  .user-memberfor {
    margin: 0.3rem 0.1rem;
    font-size: 13px;
    color: #6a737c;
    display: flex;
    align-items: center;
  }

  .user-img {
    height: 128px;
    border-radius: 5px;
  }

  .flex-end {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0.5rem;
  }

  input {
    padding: 0.3rem;
    font-size: 28px;
    border-radius: 5px;
    border: 1px solid #babfc4;
  }

  button{
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #3b4045;
    border: 1px solid #babfc4;
    padding: 0.4rem 0.7rem;
    border-radius: 5px;
    margin: 0.4rem 0;
  }

  img {
    margin: 0 7px 0 0;
  }

  .blue-btn {
    background-color: #0a95ff;
    color: #ffffff;
    margin-left: 0.6rem;

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

  .blue-text-btn {
    color: #0a95ff;
    border: 0;

    &:hover {
      background-color: #f0f8ff;
    }

    &:active {
      box-shadow: 0px 0px 0px 4px #d9eaf7;
    }
  }
`;