import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  SignUpContainer, 
  SignUpWrap,
  FormContainer,
  LeftText, 
  SignUpInputForm,
  ErrorMsg,
  SignUpBtn,
  LinkTo,
} from './SignUp.styled';

import signup_1 from '../../common/image/signup_1.png'
import signup_2 from '../../common/image/signup_2.png'
import signup_3 from '../../common/image/signup_3.png'
import signup_4 from '../../common/image/signup_4.png'


export default function SignUp() {
  const navigate = useNavigate()

  const [ signupInfo, setSignupInfo ] = useState({
    nickname: '',
    email: '',
    password: '',
  });

  const [ errors, setErrors ] = useState([]);

  const handleInputValue = (field, value) => {
    setSignupInfo({ ...signupInfo, [field]: value})
  }

  const handleSignup = (e) => {
    e.preventDefault();
    setErrors([]);

    const regExpNickname = /^[A-Za-z0-9가-힣]{2,8}$/
    const regExpEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const regExpPassword = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*#?&])[A-Za-z[0-9]$@$!%*#?&]{8,20}$/;

    if (!signupInfo.nickname) {
      setErrors((prevErrors) => [...prevErrors, 'Nickname_empty'])
    } else if(!regExpNickname.test(signupInfo.nickname)) {
      setErrors((prevErrors) => [...prevErrors, 'Nickname_invaild'])
    }

    if(!signupInfo.email) {
      setErrors((prevErrors) => [...prevErrors, 'Email_empty'])
    } else if(!regExpEmail.test(signupInfo.email)) {
      setErrors((prevErrors) => [...prevErrors, 'Email_invaild'])
    }

    if(!signupInfo.password) {
      setErrors((prevErrors) => [...prevErrors, 'Password_empty'])
    } else if(!regExpPassword.test(signupInfo.password)) {
      setErrors((prevErrors) => [...prevErrors, 'Password_invaild'])
    } else {
        fetch(`http://localhost:3000/sign-up/members`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signupInfo),
        })
        .then(res => {
          if (res.status === 201) {
            return res.json().then(data => {
              console.log('요청이 성공했습니다.');
              console.log(data);
              navigate('/login');
            })
          } else {
            console.log('요청이 실패했습니다.');
          }
        })
        .catch(error => {
          console.log('에러', error);
        });
      }
  }

  return (
    <SignUpContainer>
      <SignUpWrap>
        <LeftText>
          <h1>Join the Stack Overflow community</h1>
          <div className='sentence'>
            <img src={signup_1} alt='icon'></img>
            <div>Get unstuck — ask a question</div>
          </div>
          <div className='sentence'>
              <img src={signup_2} alt='icon'></img>
              <div>Unlock new privileges like voting and commenting</div>
          </div>
          <div className='sentence'>
            <img src={signup_3} alt='icon'></img>
            <div>Save your favorite questions, answers, watch tags, and more</div>
          </div>
          <div className='sentence'>
            <img src={signup_4} alt='icon'></img>
            <div>Earn reputation and badges</div>
          </div>
          <div>
            Collaborate and share knowledge with a private group for FREE.
            <br/><a href='https://stackoverflow.co/teams/?utm_source=so-owned&utm_medium=product&utm_campaign=free-50&utm_content=public-sign-up'>Get Stack Overflow for Teams free for up to 50 users.</a>
          </div>
        </LeftText>
        <div>
          <FormContainer>
            <form >
              <SignUpInputForm>
                <label htmlFor='name'>Display name</label>
                <input 
                  type='text' 
                  id='name' 
                  value={signupInfo.nickname} 
                  onChange={(e) => handleInputValue("nickname", e.target.value)}
                  >
                </input>
                {errors.includes('Nickname_empty') && (
                  <ErrorMsg>Display name cannot be empty.</ErrorMsg>
                )}
                {errors.includes('Nickname_invaild') && (
                  <ErrorMsg>This Nickname is not vaild.</ErrorMsg>
                )}
              </SignUpInputForm >
              <SignUpInputForm>
                <label htmlFor='email'>Email</label>
                <input 
                  type='text' 
                  id='email' 
                  value={signupInfo.email} 
                  onChange={(e) => handleInputValue("email", e.target.value)}
                  >
                </input>
                {errors.includes('Email_empty') && (
                  <ErrorMsg>Email cannot be empty.</ErrorMsg>
                )}
                {errors.includes('Email_invaild') && (
                  <ErrorMsg>This email is not vaild.</ErrorMsg>
                )}
              </SignUpInputForm>
              <SignUpInputForm>
                <label htmlFor='password'>Password</label>
                <input 
                  type='password' 
                  id='password' 
                  value={signupInfo.password} 
                  onChange={(e) => handleInputValue("password", e.target.value)}
                  >
                </input>
                {errors.includes('Password_empty') && (
                  <ErrorMsg>Password cannot be empty.</ErrorMsg>
                )}
                {errors.includes('Password_invaild') && (
                  <ErrorMsg>This password is not vaild.</ErrorMsg>
                )}
                <p>Passwords must contain at least eight characters, including at least 1 letter, 1 special character and 1 number.</p>
              </SignUpInputForm>
            </form>
            <SignUpBtn>
              <button type="submit" onClick={handleSignup}>Sign Up</button>
            </SignUpBtn>
            <p>By clicking “Sign up”, you agree to our <a href='https://stackoverflow.com/legal/terms-of-service/public'>terms of service</a> 
              and acknowledge that you have read and understand our <a href='https://stackoverflow.com/legal/privacy-policy'>privacy policy</a> and <a href='https://stackoverflow.com/conduct'>code of conduct</a>.</p>
          </FormContainer>
          <LinkTo>
            <div>Already have an account?&nbsp;
              <a href='/login'>Log in</a>
            </div>
            <div>Are you an employer?&nbsp;
              <a href='https://talent.stackoverflow.com/users/login'>Sign up on Talent</a>
            </div>
          </LinkTo>
        </div>
      </SignUpWrap>
    </SignUpContainer>
  );
}

// form onSubmit={handleSignup}에 적용안됨.