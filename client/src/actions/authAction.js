import setAuthToken from 'utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';
import axios from 'axios';

const apiUrl = 'http://localhost:5000';


export const registerUser = (userData) => (dispatch) => {
  return axios.post(`${apiUrl}/register`, userData)
    .then((res) => {
      window.location = '/authentication/sign-in';
    })
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
  };



export const loginUser = (userData) => (dispatch) => {
  // Set loading to true when starting the authentication request
  dispatch(setUserLoading());

  return axios.post(`${apiUrl}/login`, userData)
    .then((res) => {
      const { token } = res.data;
      console.log('Frontend Token:', token);
      
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);

      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });

      // Return a rejected promise to allow catching errors in the component
      return Promise.reject(err);
    });
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};