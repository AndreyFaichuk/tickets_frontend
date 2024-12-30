import { useMemo } from 'react';
import countryList from 'react-select-country-list';

export const useGetAllCountriesList = () => {
  return useMemo(() => countryList().getData(), []);
};
