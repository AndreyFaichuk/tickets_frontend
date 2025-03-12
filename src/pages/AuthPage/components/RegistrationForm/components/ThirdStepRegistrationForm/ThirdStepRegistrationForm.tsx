import { FC } from 'react';

import { useGetAllCountriesList } from '../../../../../../hooks/useGetAllCountriesList';
import { FormSelectWithSearch } from '../../../../../../components/shared/FormSelectWithSearch';
import { REGISTRATION_FORM_NAMES } from '../../constants';

export const ThirdStepRegistrationForm: FC = () => {
  const allCountriesList = useGetAllCountriesList();

  return (
    <FormSelectWithSearch
      label="Country"
      name={REGISTRATION_FORM_NAMES.country}
      options={allCountriesList}
    />
  );
};
