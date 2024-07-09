import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ThemeProvider, CacheProvider } from '@emotion/react';
import { cacheRtl, theme as rtlTheme } from '../styles/rtlTheme';
import {AreaAndCountryType, handleChangeProps} from '../types/types'
import { createTheme } from '@mui/material';
import { areas } from '../types/options.types';


export default function AreaSelect({onChange}:handleChangeProps) {
  const handleInputChange = (event: React.SyntheticEvent<Element, Event>,  value: string) => {
    onChange({
      target: {
        name: 'area',
        value: value,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  }
  return (
    <Autocomplete
      options={areas}
      autoHighlight
      fullWidth
      getOptionLabel={(option) => option.name}
      onInputChange={handleInputChange}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          {option.name} 
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="בחר עיר/אזור"
          fullWidth
          name="area"
          id="area"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}



