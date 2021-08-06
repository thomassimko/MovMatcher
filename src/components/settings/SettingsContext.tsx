import React, { createContext, useEffect, useReducer } from 'react';
import settings from 'electron-settings';

export type SettingsContextState = {
  inputFolder: string;
  outputFolder: string;
  dismissTmdbBanner: boolean;
};

export type SettingsContextActionType =
  | 'SET_INPUT_FOLDER'
  | 'SET_OUTPUT_FOLDER'
  | 'DISMISS_TMBD_BANNER';

export type SettingsContextAction = {
  type: SettingsContextActionType;
  payload: any;
};

const initialState: SettingsContextState = {
  inputFolder: '/',
  outputFolder: '/',
  dismissTmdbBanner: false,
};

const actionTypeToSettingsKey = {
  SET_INPUT_FOLDER: 'inputFolder',
  SET_OUTPUT_FOLDER: 'outputFolder',
  DISMISS_TMBD_BANNER: 'dismissTmdbBanner',
};

const reducer = (
  state: SettingsContextState,
  action: SettingsContextAction
) => {
  const key = actionTypeToSettingsKey[action.type];
  if (!key) {
    return state;
  }
  settings.set(key, action.payload);
  return {
    ...state,
    [key]: action.payload,
  };
};

export const SettingsContext = createContext<
  [SettingsContextState, React.Dispatch<SettingsContextAction>]
>([initialState, () => undefined]);

export const SettingsProvider: React.FC = ({ children }) => {
  const [curState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    Object.keys(actionTypeToSettingsKey).forEach((key) =>
      settings.get(key).then((value) => {
        return dispatch({
          type: key as SettingsContextActionType,
          payload: value as any,
        } as SettingsContextAction);
      })
    );
  }, []);
  return (
    <SettingsContext.Provider value={[curState, dispatch]}>
      {children}
    </SettingsContext.Provider>
  );
};
