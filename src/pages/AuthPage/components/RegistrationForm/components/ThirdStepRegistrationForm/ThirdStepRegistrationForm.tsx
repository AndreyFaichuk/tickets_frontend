import { FC } from 'react';

import { useGetAllCountriesList } from '../../../../../../hooks/useGetAllCountriesList';
import { FormSelectWithSearch } from '../../../../../../components/shared/FormSelectWithSearch';

export const ThirdStepRegistrationForm: FC = () => {
  const allCountriesList = useGetAllCountriesList();

  return (
    <FormSelectWithSearch
      label="Country"
      name="country"
      options={allCountriesList}
    />
  );
};
