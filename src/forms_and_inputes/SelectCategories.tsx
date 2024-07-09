import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled, lighten, darken } from '@mui/system';
import { cacheRtl, theme as rtlTheme } from '../styles/rtlTheme';
import { ThemeProvider, CacheProvider } from '@emotion/react';
import { categories } from '../types/options.types';
import { handleChangeProps } from '../types/types'
const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
  padding: 0,
});


export default function SelectCategories({ onChange }: handleChangeProps) {
  const options = categories.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  })


  const handleInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    onChange({
      target: {
        name: 'category',
        value: value,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };
  return (
    <Autocomplete
      id="grouped-demo"
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.title}
      sx={{ width: 'fullwidth' }}
      onInputChange={handleInputChange}
      renderInput={(params) =>
        <TextField {...params} label="בחר קטגוריה" />
      }
      renderGroup={(params) => (
        <ThemeProvider theme={rtlTheme}>
          <CacheProvider value={cacheRtl}>
            <li key={params.key}>
              <GroupHeader>{params.group}</GroupHeader>
              <GroupItems>{params.children}</GroupItems>
            </li>
          </CacheProvider>
        </ThemeProvider>
      )}
    />

  );
}
