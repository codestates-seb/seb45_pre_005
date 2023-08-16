import { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import UserInfo from './UserInfo/UserInfo';
import { BaseContainer, BaseWrap } from '../../style/Global.styled';
import { MyPageContainer } from './MyPage.styled';

export default function MyPage({ userId }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`/members/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (userId) {
      fetchUserData();
    }
  }, [userData]);

  return (
    <BaseContainer>
      <BaseWrap>
        <MyPageContainer>
          <UserInfo
            userData={userData}
          />
        </MyPageContainer>

      </BaseWrap>
      <Footer />
    </BaseContainer>
  );
}
