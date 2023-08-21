/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  LoginContainer,
  LoginWrap,
  LoginBox,
  LogoImg,
  FormContainer,
  InputForm,
  ErrorMsg,
  SignUpBtn,
  LinkTo
} from './Login.styled';
import logo from '../../common/image/logo.ico';
import { login } from '../../redux/actions/loginInfo';

const BASE_URL = process.env.REACT_APP_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginReducer = useSelector((state) => state.loginReducer); // 추가됨

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState([]);

  const handleInputValue = (field, value) => {
    setLoginInfo({ ...loginInfo, [field]: value });
  };

  const handleLogin = (e) => {
    // const accessToken = 'act123';
    // const refreshToken = 'rft456';
    const userId = '2asd123sdc';
    const isLoggedIn = true;

    // localStorage.setItem('accessToken', accessToken);
    // localStorage.setItem('refreshToken', refreshToken);
    // localStorage.setItem('userId', userId);

    // // 로그인 상태 변경
    // dispatch(login(isLoggedIn, accessToken, refreshToken, userId));
    // navigate('/');
    // console.log(loginReducer);
    // console.log(login(isLoggedIn, accessToken, refreshToken, userId));

    e.preventDefault();
    setErrors([]);

    const regExpEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (!loginInfo.email) {
      return setErrors((prevErrors) => [...prevErrors, 'Email_empty']);
    } else if (!regExpEmail.test(loginInfo.email)) {
      return setErrors((prevErrors) => [...prevErrors, 'Email_invaild']);
    }

    if (!loginInfo.password) {
      return setErrors((prevErrors) => [...prevErrors, 'Password_empty']);
    } else {
      fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo),
        credentials: 'include',
        mode: 'cors'
      })
        .then((res) => {
          // 응답에 엑세스 토근이 있거나 리프레시 토큰이 있으면,
          //res.headers.get('Authorization') && res.headers.get('Refresh')
          if (res.status === 200) {
            const accessToken = res.headers.get('Authorization'); // .split(' ')[1];
            const refreshToken = res.headers.get('Refresh');
            console.log(res);
            console.log(accessToken);
            console.log(refreshToken);
            // res.json().then((data) => {
            // const { userId } = res.userId;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            dispatch(login(isLoggedIn, accessToken, refreshToken, userId));
            console.log(login(isLoggedIn, accessToken, refreshToken, userId));
            console.log(loginInfo);
            console.log('로그인에 성공했습니다.');
            navigate('/');
            // });
          } else if (res.status === 401) {
            console.log('로그인에 실패했습니다.');
            console.log(res);
            setErrors((prevErrors) => [
              ...prevErrors,
              'Email_Or_Password_invaild'
            ]);
          }
        })
        .catch((err) => {
          console.log('에러.', err);
        });
    }
  };

  return (
    <LoginContainer>
      <LoginWrap>
        <LoginBox>
          <LogoImg>
            <Link to="/">
              <img src={logo} alt="logo"></img>
            </Link>
          </LogoImg>

          <FormContainer>
            <form>
              <InputForm>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={loginInfo.email}
                  onChange={(e) => handleInputValue('email', e.target.value)}
                ></input>
                {errors.includes('Email_empty') && (
                  <ErrorMsg>Email cannot be empty.</ErrorMsg>
                )}
                {errors.includes('Email_invaild') && (
                  <ErrorMsg>This email is not vaild.</ErrorMsg>
                )}
              </InputForm>
              <InputForm>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={loginInfo.password}
                  onChange={(e) => handleInputValue('password', e.target.value)}
                ></input>
                {errors.includes('Password_empty') && (
                  <ErrorMsg>Password cannot be empty.</ErrorMsg>
                )}
                {errors.includes('Email_Or_Password_invaild') && (
                  <ErrorMsg>Email or password is incorrect.</ErrorMsg>
                )}
              </InputForm>
            </form>
            <SignUpBtn>
              <button type="submit" onClick={handleLogin}>
                Log in
              </button>
            </SignUpBtn>
          </FormContainer>
          <LinkTo>
            <div>
              Don’t have an account?&nbsp;
              <a href="/sign-up">Sign up</a>
            </div>
            <div>
              Are you an employer?&nbsp;
              <a href="https://talent.stackoverflow.com/users/login">
                Sign up on Talent
              </a>
            </div>
          </LinkTo>
        </LoginBox>
      </LoginWrap>
    </LoginContainer>
  );
}
