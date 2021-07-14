import React, { createContext, useReducer } from 'react';

export type SettingsContextState = {
  inputFolder: string;
  outputFolder: string;
  dismissTmdbBanner: boolean;
  hideDonateButton: boolean;
};

export type SettingsContextActionType =
  | 'SET_INPUT_FOLDER'
  | 'SET_OUTPUT_FOLDER'
  | 'DISMISS_TMBD_BANNER'
  | 'HIDE_DONATE_BUTTON';

export type SettingsContextAction = {
  type: SettingsContextActionType;
  payload: any;
};

const initialState: SettingsContextState = {
  inputFolder: '/',
  outputFolder: '/',
  dismissTmdbBanner: true,
  hideDonateButton: false,
};

const reducer = (
  state: SettingsContextState,
  action: SettingsContextAction
) => {
  console.log(action);
  switch (action.type) {
    case 'SET_INPUT_FOLDER':
      return {
        ...state,
        inputFolder: action.payload,
      };
    case 'SET_OUTPUT_FOLDER':
      return {
        ...state,
        outputFolder: action.payload,
      };
    case 'DISMISS_TMBD_BANNER':
      return {
        ...state,
        dismissTmdbBanner: action.payload,
      };
    case 'HIDE_DONATE_BUTTON':
      return {
        ...state,
        hideDonateButton: action.payload,
      };
    default:
      return state;
  }
};

export const SettingsContext = createContext<
  [SettingsContextState, React.Dispatch<SettingsContextAction>]
>([initialState, () => undefined]);

export const SettingsProvider: React.FC = ({ children }) => {
  const [curState, dispatch] = useReducer(reducer, initialState);
  console.log(curState);
  return (
    <SettingsContext.Provider value={[curState, dispatch]}>
      {children}
    </SettingsContext.Provider>
  );
};
