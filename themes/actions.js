import { actions } from './constants'

export const changeTheme = theme => {
    return dispatch => {
      dispatch({
        type: actions.changeTheme,
        name: theme
      });
    };
  };
  
  export const changeColorTheme = ColorTheme => {
    return dispatch => {
      dispatch({
        type: actions.changeColorTheme,
        name: ColorTheme
      });
    };
  };