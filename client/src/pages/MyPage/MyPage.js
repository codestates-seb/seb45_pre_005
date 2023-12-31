import { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import Nav from '../../components/Nav/Nav';
import UserProfile from '../../components/UserProfile/UserProfile';
import UserInfo from '../../components/UserInfo/UserInfo';
import { BaseContainer, BaseWrap } from '../../style/Global.styled';
import { MyPageContainer } from './MyPage.styled';
import { useNavigate } from 'react-router-dom';
export default function MyPage() {
  const [userData, setUserData] = useState(null);
  const BASE_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      // window.location = '/login';
      navigate('/login');
      return;
    }

    async function fetchUserData() {
      // const url = `/members`;
      const url = `${BASE_URL}/members`;
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('accessToken'),
            Accept: 'application/json',
            'ngrok-skip-browser-warning': '69420'
          },
          credentials: 'include',
          mode: 'cors'
        });

        if (response.ok) {
          // console.log('get user data success');
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Fetch user data failed');
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserData();
  }, []);

  if (!userData) {
    return (
      <BaseContainer>
        <BaseWrap>
          <h1>Loading...</h1>
        </BaseWrap>
      </BaseContainer>
    );
  }

  return (
    <BaseContainer>
      <BaseWrap>
        <Nav tabNum={3} />
        <MyPageContainer>
          <UserProfile userData={userData} setUserData={setUserData} />
          <UserInfo userData={userData} />
        </MyPageContainer>
      </BaseWrap>
      <Footer />
    </BaseContainer>
  );
}
