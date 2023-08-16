import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
export const DetailContainer = styled.div`
  padding: 24px;
  width: 100%;
  min-width: 1000px;
`;

export const DetailHeader = styled.div`
  padding-bottom: 6px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--gray-10);

  h1 {
    font-size: 27px;
    margin-bottom: 8px;
  }

  .header-desc-container {
    display: flex;
    font-size: 13px;
  }

  .header-desc-container div {
    margin-right: 16px;
    margin-bottom: 8px;
  }

  .header-desc-container div span:first-child {
    color: var(--gray);
    margin-right: 5px;
  }
`;

export const ButtonContainer = styled.div`
  padding: 24px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
`;

export const LinkButton = styled(Link)`
  background-color: var(--blue);
  color: var(--white);
  padding: 10px;
  border-radius: 6px;
  font-size: 13px;
  width: 100px;

  &:hover {
    background-color: var(--blue-hover);
  }
`;
export const DescContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 16px 0;

  button {
    font-size: 13px;
    margin-right: 10px;
    color: var(--gray);
  }
`;

export const DetailUserContainer = styled.div`
  padding: 7px;
  font-size: 13px;
  background-color: ${(props) => (props.author ? 'var(--sky-blue)' : '')};
  min-width: 200px;
  border-radius: 3px;
  span {
    color: var(--gray);
  }

  p {
    color: var(--blue-hover);
  }

  .user-desc-container {
    display: flex;
    align-items: center;
    margin-top: 8px;
  }

  .user-desc-container div {
    background-color: var(--gray-10);
    border-radius: 5px;
    margin-right: 8px;
  }

  .user-desc-container img {
    width: 32px;
    height: 32px;
  }
`;

export const AnswerContainer = styled.div`
  padding: 10px 0;

  h2 {
    font-size: 19px;
    margin-bottom: 8px;
  }
`;

export const AnswerFormContainer = styled.div`
  padding-top: 20px;
  h2 {
    font-size: 19px;
    margin-bottom: 20px;
  }
  button {
    background-color: var(--blue);
    color: var(--white);
    padding: 10px;
    border-radius: 6px;
    font-size: 13px;
    margin: 15px 0;

    &:hover {
      background-color: var(--blue-hover);
    }
  }
`;
