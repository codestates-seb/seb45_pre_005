import { styled } from 'styled-components';

export const SignUpContainer = styled.div`
  display: flex;
  padding-top: 60px;
  width: 100%;
  font-size: 13px;
  background-color: hsl(210,8%,95%);
  justify-content: center;
`;

export const SignUpWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1264px;
`
// 왼쪽 text 
export const LeftText = styled.section`
  max-width: 36em; 
  margin: 0px 48px 128px 0px;
  h1 {
    font-size: 27.04px;
    margin-bottom: 32px;
  }
  .sentence {
    display: flex;
    margin: 0px 0px 24px;
  }
  img {
    margin-right: 8px;
    object-fit: contain;
  }
  .sentence > div {
    font-size: 15px;
    font-weight: 100;
  }
  > div:last-child {
    font-size: 13px;
    color: hsl(210,8%,45%);
  }
  a {
    font-weight: 100;
    color: hsl(206,100%,40%);
    &:hover {
      color: hsl(206,100%,52%);
    }
  }
`

// 회원가입 박스
export const FormContainer = styled.div`
  max-width: 24.31em; 
  background-color: white;
  padding: 24px;
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: 0 10px 24px hsla(0,0%,0%,0.05), 0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);
  p {
    font-size: 12px;
    color: hsl(210,8%,45%);
    font-weight: 100; 
    margin: 4px 0px;
  }
  a {
    font-weight: 100;
    color: hsl(206,100%,40%);
    &:hover {
      color: hsl(206,100%,52%);
    }
  }
`

export const SignUpInputForm = styled.div`
  margin: 6px 0px;
  > label {
    display: block;
    font-size: 15px;
    font-weight: 500;
    margin: 2px 0px 4px 0px;
    padding: 0px 2px;
  }
  > input {
    padding: 7.8px 9.1px;
    border: 1px solid hsl(210,8%,75%);
    border-radius: 6px;
    font-size: 13px;
    width: 100%;
    margin: 0;

    &:focus {
      border: 1px solid #59A4DE;
      box-shadow: 0px 0px 0px 4px #D9EAF7;
      outline: none;
      transition: none;
    }
  }
`

export const ErrorMsg = styled.p`
  margin: 2px 0px !important;
  padding: 2px !important;
  color: red !important;
`

// 회원가입 버튼
export const SignUpBtn = styled.div`
  margin: 12px 0px 12px 0px;
  display: flex;
  flex-direction: column;
  > button {
    margin: 2px 0px;
    background-color: hsl(206,100%,52%);
    color: black;
    border-radius: 6px;
    padding: 10.4px;
    color: white;
    font-weight: 100;
    transition: none;
    &:hover {
      background-color: #0074CC;
    }
    &:active {
      background-color: #0063BF;
      box-shadow: 0px 0px 0px 4px #D9EAF7;
    }
  }
`
export const LinkTo = styled.div`
  text-align: center;
  padding: 16px;
  margin-bottom: 24px;
  div {
    font-weight: 100;
  }
  div:last-child{
    margin-top: 12px;
  }
  a {
    color: hsl(206,100%,40%);
    &:hover {
      color: hsl(206,100%,52%);
    }
  }
`


