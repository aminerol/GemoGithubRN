import { fontSizes, fontWeights, themes, colors, actions } from './constants'

const initialState = {
  theme: { ...fontSizes, ...fontWeights, ...themes.light, ...colors.blue }
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.changeTheme:
      let newState = {
        ...state,
        theme: { ...state.theme, ...action.name }
      };
      return newState;
    case actions.changeColorTheme:
      let newStateTheme = {
        ...state,
        theme: { ...state.theme, ...action.name }
      };
      return newStateTheme;
    default:
      return state;
  }
};

export default themeReducer;