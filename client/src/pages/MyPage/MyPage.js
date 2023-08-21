import { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import Nav from '../../components/Nav/Nav';
import UserProfile from '../../components/UserProfile/UserProfile';
import UserInfo from '../../components/UserInfo/UserInfo';
import { BaseContainer, BaseWrap } from '../../style/Global.styled';
import { MyPageContainer } from './MyPage.styled';

export default function MyPage() {
  // const [userData, setUserData] = useState({
  //   data: {
  //     email: "test@gmail.com",
  //     nickname: "test",
  //     createAt: "2022-05-17T16:45:51.403981"
  //   },
  //   list: [
  //     {
  //       title: "question_test_1",
  //       nickname: "question_testing",
  //       createdAt: "2023-08-17T16:45:58.966142"
  //     },
  //     {
  //       title: "question_test_2",
  //       nickname: "question_testing",
  //       createdAt: "2023-08-17T16:46:13.223414"
  //     }
  //   ]
  // });
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      // const authToken = localStorage.getItem('authToken');
      // const url = `${process.env.REACT_APP_API_URL}/members`;
      const url = `/members`;
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.REACT_APP_AUTH_TOKEN,
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': '69420'
          },
          credentials: 'include',
          mode: 'cors',
        });

        if (response.ok) {
          console.log('get user data success');
          const data = await response.json();
          setUserData(data);
        } else {
          console.log(response.status);
          console.log(response.statusText);
          console.error('Fetch user data failed');
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserData();
  }, []);


  if (!userData) {
    console.log('loading');
    return <h1>Loading...</h1>;
  }


  return (
    <BaseContainer>
      <BaseWrap>
        <Nav tabNum={3} />
        <MyPageContainer>
          <UserProfile
            userData={userData}
            setUserData={setUserData}
          />
          <UserInfo
            userData={userData}
          />
        </MyPageContainer>
      </BaseWrap>
      <Footer />
    </BaseContainer>
  );
}
