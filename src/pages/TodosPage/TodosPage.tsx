import { BasePage } from '../../app/BasePage';
import { PAGES_MAP } from '../../constants';

import { DnDToDoProvider } from './components/DnDToDoProvider';
import { DisplayWithLoader } from '../../components/shared/DisplayWithLoader';
import { useColumnsFetch } from '../../hooks/columns/useColumnsFetch';

export const TodosPage = () => {
  const { allColumns, areAllColumnsLoading } = useColumnsFetch();

  return (
    <BasePage.Root>
      <BasePage.Title title={PAGES_MAP.dashboard} />
      <DisplayWithLoader isloading={areAllColumnsLoading}>
        <DnDToDoProvider data={allColumns} />
      </DisplayWithLoader>
    </BasePage.Root>
  );
};
