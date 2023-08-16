import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const NavContainer = styled.nav`
  min-width: 164px;
  min-height: var(--main-height);
  border-right: 1px solid var(--gray-10);
  position: sticky;
  padding-top: 24px;
`;

export const NavLinkContainer = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 34px;
  padding: 4px 4px 4px 8px;
  font-size: 13px;
  color: ${(props) =>
    props.selected === props.tabNum ? 'var(--black)' : 'var(--gray-20)'};
  font-weight: ${(props) =>
    props.selected === props.tabNum ? 'bold' : 'none'};
  border-right: ${(props) =>
    props.selected === props.tabNum ? '3px solid var(--orange)' : 'none'};
  background-color: ${(props) =>
    props.selected === props.tabNum ? 'var(--white-10)' : 'none'};

  img {
    margin-right: 4px;
  }

  &:hover {
    color: var(--black);
  }
`;
