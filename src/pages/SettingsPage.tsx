import React, { FC, useContext } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Switch,
  TextField,
} from '@material-ui/core';
import { Card } from '../components/Card';
import { DirectoryPicker } from '../components/DirectoryPicker';
import {
  SettingsContext,
  SettingsContextAction,
} from '../components/settings/SettingsContext';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SettingsPageProps {}

export const SettingsPage: FC<SettingsPageProps> = (
  props: SettingsPageProps
) => {
  const [state, dispatch] = useContext(SettingsContext);

  const updateDirectory = (isInput: boolean, directory: string) => {
    const data: SettingsContextAction = {
      type: isInput ? 'SET_INPUT_FOLDER' : 'SET_OUTPUT_FOLDER',
      payload: directory,
    };
    dispatch(data);
  };

  return (
    <Card extraClasses="flex-grow overflow-y-scroll">
      <FormControl component="fieldset" className="w-full">
        <FormGroup>
          <div className="flex mb-2">
            <TextField
              disabled
              className="flex-grow"
              label="Output Directory"
              value={state.outputFolder}
              variant="outlined"
              size="small"
            />
            <div className="pl-2" />
            <DirectoryPicker
              onChange={(directory) => updateDirectory(false, directory)}
              buttonText="Change output directory"
            />
          </div>
          <FormControlLabel
            control={<Switch name="tmbd" />}
            label="Suppress TMDb Message"
          />
          <FormControlLabel
            control={<Switch name="donate" />}
            label="Hide donate button"
          />
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
    </Card>
  );
};
