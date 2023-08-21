import {LOGIN, LOGOUT, SET_LOGIN_STATUS} from '../actions/loginInfo'

const initialState = {
    isLoggedIn: false,
    accessToken: '',
    refreshToken: '',
}

export const loginReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                accessToken: '',
                refreshToken: '',
            }
        case SET_LOGIN_STATUS:
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn
                }
        default: 
            return state;
            
    }
}