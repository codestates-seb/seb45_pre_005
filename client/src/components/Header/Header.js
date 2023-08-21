import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect } from 'react';
import {
  HeaderContainer,
  HeaderWrap,
  Btn,
  NavContainer,
  HeaderLogo,
  LogoLink,
  InputForm,
} from './Header.styled';
import headerLogoImg from '../../common/image/header-logo.png';
import Search from '../../common/image/Search.png'
import { logout, setLoginStatus } from '../../redux/actions/loginInfo'


export default function Header() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.login) || false
  // const isLoggedIn = false;
  const handleLogout = () => {
    dispatch(logout());
    console.log('로그아웃')
    console.log(isLoggedIn)
    // 토큰삭제
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    // 로그아웃 후 화면 새로고침
    window.location.reload();
  }

  // 로그아웃 이후 저장된 액세스 토큰이 없으므로 로그인 상태(isLoggedIn)를 false로 변경
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken')
    if (!storedAccessToken) {
      dispatch(setLoginStatus({ isLoggedIn: true }))
      console.log(isLoggedIn)
      console.log('토큰 있음')
      console.log(setLoginStatus())
    } else {
      dispatch(setLoginStatus({ isLoggedIn: false }))
      console.log('토큰 없음')
      console.log(setLoginStatus())
    }
  }, [])


  return (
    <HeaderContainer>
      <HeaderWrap>
        <LogoLink to="/">
          <HeaderLogo src={headerLogoImg} />
        </LogoLink>

        {/* 검색 */}
        <InputForm>
          <img src={Search} alt='Search'></img>
          <input type="text" placeholder="Search..." />
        </InputForm>

        <NavContainer>
          {isLoggedIn ? (
            <ul>
              <li>
                <Btn className='loginBtn' to="/login">Log in</Btn>
              </li>
              <li>
                <Btn className='sigupBtn' to="/sign-up">Sign up</Btn>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Btn className='myPageBtn' to="/my-page">마이페이지</Btn>
              </li>
              <li>
                <Btn className='logouBtn' to="/login" onClick={handleLogout}>Log out</Btn>
              </li>
            </ul>
          )}
        </NavContainer>
      </HeaderWrap>
    </HeaderContainer>
  );
}
