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
  SettingsContextActionType,
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

  const updateSetting = (type: SettingsContextActionType, payload: boolean) => {
    const data: SettingsContextAction = {
      type,
      payload,
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
            control={
              <Switch
                name="tmbd"
                checked={!!state?.dismissTmdbBanner}
                onChange={(e) =>
                  updateSetting('DISMISS_TMBD_BANNER', e.target.checked)
                }
              />
            }
            label="Suppress TMDb Message"
          />
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
    </Card>
  );
};
