import { styled } from 'styled-components';

export const InputGuideContainer = styled.div`
  border: 1px solid #E3E6E8;
  color: #232629;
  border-radius: 5px;
  margin-left: 1rem;
  /* margin-right: 0; */
  width: 30%;
  position: absolute;
  left: 70%;
  display: block;
  box-sizing: border-box;
`;

export const InputGuideTitle = styled.div`
  padding: 0.6rem 1rem;
  background-color: #F8F9F9;
  border-bottom: 1px solid #E3E6E8;
  font-size: 15px;
`;

export const InputGuideBody = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.6rem;
  font-size: 12px;
  p {
    margin: 0.5rem 0;
  }

  img {
    height: 60px;
    margin: 0.3rem;
  }
`;