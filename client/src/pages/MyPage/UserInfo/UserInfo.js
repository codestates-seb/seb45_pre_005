import { UserInfoConatiner } from './UserInfo.styled';

export default function UserInfo({ userId }) {
  return (
    <UserInfoConatiner>
      {userId}
    </UserInfoConatiner>
  );
}