import { FC } from 'react';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';

import { DEFAULT_PER_PAGE, PerPage } from '@stores/workspacesStore/constants';

type DefaultPerPageProps = SelectProps & {
  currentPerPage: PerPage;
  setCurrentPerPage: (currentPerPage: PerPage) => void;
};

export const DefaultPerPage: FC<DefaultPerPageProps> = ({
  currentPerPage,
  setCurrentPerPage,
}) => {
  const handleSetCurrentPerPage = (event: SelectChangeEvent) => {
    setCurrentPerPage(event.target.value as PerPage);
  };

  const defaultPerPageOptions = Object.values(DEFAULT_PER_PAGE);

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="select-perpage-label">Per page</InputLabel>
      <Select
        labelId="select-perpage-label"
        value={currentPerPage}
        label="Per Page"
        onChange={handleSetCurrentPerPage}>
        {defaultPerPageOptions.map((perPage) => {
          return (
            <MenuItem key={perPage} value={perPage}>
              {perPage}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
