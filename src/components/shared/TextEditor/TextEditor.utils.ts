type MenuBarActions = {
  isActive: boolean;
  onClick: VoidFunction;
};

export type MenuBar<T extends string | number> = {
  [key in T]: MenuBarActions & {
    isDivider?: boolean;
  };
};

export const getDefaultEditorOptions = <T extends string | number, K>(
  defaultValues: object,
  actions: { onClick: (value: K) => void; isActive: (value: K) => boolean },
) => {
  const { onClick, isActive } = actions;

  return Object.fromEntries(
    Object.entries(defaultValues).map(([key, value]) => [
      key,
      {
        onClick: () => onClick(value as K),
        isActive: isActive(value as K),
      },
    ]),
  ) as MenuBar<T>;
};
