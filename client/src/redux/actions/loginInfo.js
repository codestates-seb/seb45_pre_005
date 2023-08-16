export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS'

export const login = ( accessToken, refreshToken, memberId ) => ({
    type: LOGIN,
    payload: { accessToken, refreshToken, memberId }
});

export const logout = () => ({
    type: LOGOUT,
});

export const setLoginStatus = ( isLoggedIn ) => ({
    type: SET_LOGIN_STATUS,
    payload: { isLoggedIn }
});