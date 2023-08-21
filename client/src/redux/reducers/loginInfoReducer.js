import { LOGIN, LOGOUT, SET_LOGIN_STATUS } from '../actions/loginInfo';

const initialState = {
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  memberId: ''
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    //   return {
    //     // ...state,
    //     // isLoggedIn: action.payload.isLoggedIn,
    //     // accessToken: action.payload.accessToken,
    //     // refreshToken: action.payload.refreshToken,
    //     // memberId: action.payload.memberId
    //   };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        accessToken: '',
        refreshToken: '',
        memberId: ''
      };
    case SET_LOGIN_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload
      };
    default:
      return state;
  }
};
