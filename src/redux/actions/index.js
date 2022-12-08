export const SAVE_USER_INFO = 'SAVE_USER_INFO';

export const userInfoAction = (email) => ({
  type: SAVE_USER_INFO,
  payload: email,
});
