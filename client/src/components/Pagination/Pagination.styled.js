import { styled } from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 4rem 0 6rem 2.5rem;

  button {
    margin: 0 0.2rem;
    font-size: 13px;
    padding: 0.3rem 0.6rem;
    border: 1px solid #d6d9dc;
    background-color: #ffffff;
    color: #3b4045;
    border-radius: 5px;

    &:hover {
      background-color: #d6d9dc;
      border: 1px solid #babfc4;
    }

    &:disabled {
      background-color: #f48225;
      border: none;
    }

    &:active {
      box-shadow: none;
    }
  }

  button.not-number {
    background-color: #ffffff;
    color: #3b4045;
    border: none;
    padding: 0.3rem;

    &:hover {
      background-color: #ffffff;
      border: none;
    }
  }
`;