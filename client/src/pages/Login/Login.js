import { Link , useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { 
  LoginContainer,
  LoginWrap,
  LoginBox,
  LogoImg,
  FormContainer,
  InputForm,
  ErrorMsg,
  SignUpBtn,
  LinkTo,
} from './Login.styled';
import logo from  '../../common/image/logo.ico'
import { login } from '../../redux/actions/loginInfo';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [ loginInfo, setLoginInfo ] = useState({
    email: '',
    password: '',
  });
  const [ errors, setErrors ] = useState([]);

  const handleInputValue = (field, value) => {
    setLoginInfo({ ...loginInfo, [field]: value})
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setErrors([]);

    const regExpEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    
    if(!loginInfo.email) {
      setErrors((prevErrors) => [...prevErrors, 'Email_empty'])
    } else if(!regExpEmail.test(loginInfo.email)) {
      setErrors((prevErrors) => [...prevErrors, 'Email_invaild'])
    }
    
    if(!loginInfo.password) {
      setErrors((prevErrors) => [...prevErrors, 'Password_empty'])
    } else if (errors.length === 0) {
        fetch(`/members`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginInfo),
        })
        .then(res => {
          // 응답에 엑세스 토근이 있거나 리프레시 토큰이 있으면, 
          if (res.headers.get('Authorization') && res.headers.get('Refresh')) { 
              const accessToken = res.headers.get('Authorization').split(' ')[1]; // Bearer를 건너뛰고 실제 토큰 부분을 추출
              const refreshToken = res.headers.get('Refresh')

              res.json().then((data) => {
                const { memberId } = data;
                console.log(memberId)

                // 토큰 저장
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken); // 리프레시 토큰을 클라이언트에 저장??
                localStorage.setItem('memberId', memberId);

                // 로그인 상태 변경
                dispatch(login({ accessToken, refreshToken, memberId }));
                
                // 메인페이지로 이동
                navigate('/');
              });
              return 
            } else {
              // 좀더 디테일한 로그인 실패 로직 생각해보기. 비밀번호 틀림, 없는 이메일.
            console.log('로그인에 실패했습니다.');
          }
          }) 
        .catch(error => {
          console.log('에러', error);
        });
      }
    }

  return (
    <LoginContainer>
      <LoginWrap>
        <LoginBox>
          <LogoImg>
            <Link to='/'>
              <img src={logo} alt='logo'></img>
            </Link>
          </LogoImg>

          <FormContainer>
            <form >
              <InputForm>
                <label htmlFor='email'>Email</label>
                <input 
                  type='text' 
                  id='email' 
                  value={loginInfo.email} 
                  onChange={(e) => handleInputValue("email", e.target.value)}
                  >
                </input>
                {errors.includes('Email_empty') && (
                  <ErrorMsg>Email cannot be empty.</ErrorMsg>
                )}
                {errors.includes('Email_invaild') && (
                  <ErrorMsg>This email is not vaild.</ErrorMsg>
                )}
              </InputForm>
              <InputForm>
                <label htmlFor='password'>Password</label>
                <input 
                  type='password' 
                  id='password' 
                  value={loginInfo.password} 
                  onChange={(e) => handleInputValue("password", e.target.value)}
                  >
                </input>
                {errors.includes('Password_empty') && (
                  <ErrorMsg>Password cannot be empty.</ErrorMsg>
                )}
                {errors.includes('Password_invaild') && (
                  <ErrorMsg>This password is not vaild.</ErrorMsg>
                )}
              </InputForm>
            </form>
            <SignUpBtn>
              <button type="submit" onClick={handleLogin}>Sign Up</button>
            </SignUpBtn>
          </FormContainer>
          <LinkTo>
            <div>Don’t have an account?&nbsp;
              <a href='/sign-up'>Sign up</a>
            </div>
            <div>Are you an employer?&nbsp;
              <a href='https://talent.stackoverflow.com/users/login'>Sign up on Talent</a>
            </div>
          </LinkTo>
        </LoginBox>
      </LoginWrap>
    </LoginContainer>
  );
}
