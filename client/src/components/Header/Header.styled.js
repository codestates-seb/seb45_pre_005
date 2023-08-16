import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  width: 100%;
  position: fixed;
  z-index: 2;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 3px solid var(--orange);
  border-bottom: 1px solid var(--gray-10);
`;

export const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: var(--main-width);
  width: 100%;
  height: 56px;
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
  &:hover {
    background-color: #e3e6e8;
  }
`;
export const HeaderLogo = styled.img`
  padding: 0 8px;
`;

export const InputForm = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  position: relative;
  padding: 0px 8px;

  > input {
    padding: 7.8px 32px;
    border: 1px solid hsl(210,8%,75%);
    border-radius: 6px;
    font-size: 15px;
    font-weight: 300;
    width: 100%;
    margin: 0;
    &:focus {
      border: 1px solid #59A4DE;
      box-shadow: 0px 0px 0px 4px #D9EAF7;
      outline: none;
      transition: none;
    }
  }
  img {
    position: absolute;
    width: 22px;
    height: 22px;
    margin-left: 8px;
  }
`
export const NavContainer = styled.nav`
  padding-right: 12px;
  
  ul {
    display: flex;
  }
`
export const Btn = styled(Link)`
  font-size: 13px;
  font-weight: 200;
  /* display: inline-block; */
  padding: 8px 10.4px;
  background-color: hsl(205,46%,92%);
  color: hsl(205,47%,42%);
  border-radius: 6px;
  transition: none;

  &.loginBtn {
    background-color: hsl(205,46%,92%);
    color: hsl(205,47%,42%);
    &:hover {
      background-color: hsl(205,57%,81%);
      &:active {
      box-shadow: 0px 0px 0px 4px #D9EAF7;
      }
    }
  }

  &.sigupBtn {
    margin-left: 8px;
    color: white;
    background-color: hsl(206,100%,52%);
    &:hover {
      background-color: hsl(206,100%,40%);
      &:active {
      box-shadow: 0px 0px 0px 4px #D9EAF7;
      }
    }
  }

  &.myPageBtn {
    
  }

  &.logouBtn {
    margin-left: 8px;
    background-color: hsl(205,46%,92%);
    color: hsl(205,47%,42%);
    &:hover {
      background-color: hsl(205,57%,81%);
      &:active {
      box-shadow: 0px 0px 0px 4px #D9EAF7;
      }
    }
  }
`