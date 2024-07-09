import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { handleChangeProps } from '../types/types'
import { countries } from '../types/options.types';



export default function LocationSelect({ onChange }: handleChangeProps) {
  const handleInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    onChange({
      target: {
        name: 'location',
        value: value,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  }
  return (
    <Autocomplete
      options={countries}
      autoHighlight
      fullWidth
      onInputChange={handleInputChange}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="בחר מקום אבדה"
          name="location"
          id="location"
          fullWidth
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password',
          }}
        />
      )}
    />

  );
}



