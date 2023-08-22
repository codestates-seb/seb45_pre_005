import { useState, useRef, useEffect } from 'react';
import { UserProfileConatiner } from './UserProfile.styled';
import UserImg from '../../common/image/UserImg.png';
import PenImg from '../../common/image/Pen.png';
import CakeImg from '../../common/image/Cake.png';

export default function UserProfile({
  userData,
  setUserData
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newNickname, setNewNickname] = useState(userData.data.nickname);
  const inputRef = useRef(null);
  const [isNicknameValid, setIsNicknameValid] = useState(true);

  const getMemberFor = () => {
    const signupDate = new Date(userData.data.createAt);
    const currentDate = new Date();
    const timeDiff = currentDate - signupDate + (1000 * 60 * 60 * 24);

    const yearsElapsed = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
    const monthsElapsed = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30.44));
    const daysElapsed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    let result = 'Member for ';

    if (yearsElapsed > 0) {
      result += `${yearsElapsed} year${yearsElapsed > 1 ? 's' : ''}`;
      if (monthsElapsed > 0) {
        result += `, ${monthsElapsed} month${monthsElapsed > 1 ? 's' : ''}`;
      }
    } else if (monthsElapsed > 0) {
      result += `${monthsElapsed} month${monthsElapsed > 1 ? 's' : ''}`;
    } else {
      result += `${daysElapsed} day${daysElapsed > 1 ? 's' : ''}`;
    }

    return result;
  }

  useEffect(() => {
    if (isEditMode) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  const handleEditClick = () => {
    setNewNickname(userData.data.nickname);
    setIsEditMode(true);
  }

  const handleSaveClick = async () => {
    const data = {
      nickname: newNickname
    };
    const url = `${process.env.REACT_APP_API_URL}/members`;

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('accessToken')
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      if (response.ok) {
        alert('Nickname changed.');
        setUserData({
          ...userData,
          data: {
            ...userData.data,
            nickname: newNickname
          }
        });
      } else {
        alert('Fiailed to update nickname.');
      }
    } catch (error) {
      alert('Error: Failed to update nickname.');
    }

    setIsEditMode(false);
  }

  const handleNinknameInput = (e) => {
    setIsNicknameValid(e.target.value.length >= 2)
    setNewNickname(e.target.value);
  }

  return (
    <UserProfileConatiner>
      <div className='flex-box'>
        <div className='left-box'>
          <img src={UserImg} alt="" className='user-img' />
          <div className='flex-end'>
            {isEditMode ?
              <input
                ref={inputRef}
                type='text'
                value={newNickname}
                onChange={handleNinknameInput}
                maxLength={8}
              /> :
              <div
                className='user-nickname'>{userData.data?.nickname || ''}</div>}
            <div className='user-memberfor'>
              <img src={CakeImg} alt='' />
              {getMemberFor()}
            </div>
          </div>
        </div>
        <div className='right-box'>
          {isEditMode ?
            <div className='flex-direction-row'>
              <button
                onClick={() => {
                  setIsEditMode(false);
                }}
                className='blue-text-btn'
              >
                Cancle
              </button>
              <button
                onClick={handleSaveClick}
                className='blue-btn'
                disabled={!isNicknameValid}
              >
                Save Profile
              </button>
            </div> :
            <button
              onClick={handleEditClick}
            >
              <img src={PenImg} alt='' />
              Edit Profile
            </button>}
        </div>
      </div>
    </UserProfileConatiner>
  );
}