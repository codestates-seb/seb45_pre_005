import { Link } from 'react-router-dom';
import {
  HeaderContainer,
  HeaderWrap,
  HeaderLogo,
  LogoLink
} from './Header.styled';
import headerLogoImg from '../../common/image/header-logo.png';

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderWrap>
        {/* 로고 완료 */}
        <LogoLink to="/">
          <HeaderLogo src={headerLogoImg} />
        </LogoLink>

        {/* 검색 */}
        <div>
          <input type="text" placeholder="검색" />
        </div>

        {/* 멤버 */}
        <div>
          <Link to="/login">로그인</Link>
          <Link to="/sign-up"> 회원가입</Link>
          <Link to="/my-page"> 마이페이지</Link>
        </div>
      </HeaderWrap>
    </HeaderContainer>
  );
}
