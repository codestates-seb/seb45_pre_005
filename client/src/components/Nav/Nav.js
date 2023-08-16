import { NavContainer, NavLinkContainer } from './Nav.styled';
import { useState } from 'react';
import homeTabOnImg from '../../common/image/home-tab-on.png';
import homeTabOffImg from '../../common/image/home-tab-off.png';

export default function Nav({ tabNum }) {
  const [selectNav, setSelectNav] = useState(tabNum);

  const handleNavClick = (num) => setSelectNav(num);

  return (
    <NavContainer>
      <NavLinkContainer
        to="/"
        selected={selectNav}
        tabNum={1}
        onClick={() => handleNavClick(1)}
      >
        <img src={selectNav === 1 ? homeTabOnImg : homeTabOffImg} alt="home" />
        Home
      </NavLinkContainer>
      <NavLinkContainer
        to="/"
        selected={selectNav}
        tabNum={2}
        onClick={() => handleNavClick(2)}
      >
        Tags
      </NavLinkContainer>
      <NavLinkContainer
        to="../my-page"
        selected={selectNav}
        tabNum={3}
        onClick={() => handleNavClick(3)}
      >
        Users
      </NavLinkContainer>
    </NavContainer>
  );
}
