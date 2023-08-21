import { styled } from 'styled-components';

export const InputFromContainer = styled.div`
  border: 1px solid #E3E6E8;
  padding: 1rem 1.5rem;
  /* margin: 1.5rem 0; */
  border-radius: 5px;
  font-size: 12px;
  width: 70%;

  label {
    font-size: 13px;
    font-weight: 700;
  }

  div {
    margin: 0.3rem 0;
  }

  input {
    margin: 0.5rem 0;
    width: 100%;
    padding: 0.5rem 0.7rem;
    font-size: 13px;
    border: 1px solid #BABFC4;
    border-radius: 5px;
  }

  /* .next-btn {
    margin: 0.2rem 0;
    background-color: #0a95ff;
    color: #ffffff;
    padding: 0.5rem 0.8rem;
    border-radius: 7px;
  } */

  .tag {
    margin: 0.3rem 0.2rem;
    padding: 0.3rem 0.7rem;
    background-color: #e1ecf4;
    color: #39739d;
    border-radius: 7px;

    &:hover {
      color: white;
    }
  }
`;