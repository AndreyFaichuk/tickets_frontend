import { FC, useState } from 'react';

import { Input } from '../Input';
import { SwapComponents } from '../SwapComponents';

type SwapButtonComponentProps = {
  onApprove: (text: string) => void;
  children: (handleSwap: VoidFunction) => React.ReactNode;
  initialValue?: string;
};

export const SwapButtonComponent: FC<SwapButtonComponentProps> = ({
  onApprove,
  children,
  initialValue,
}) => {
  const [text, setText] = useState<string>(initialValue ?? '');

  const handleResetText = () => {
    setText('');
  };

  const handleChangeText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if (!text.trim()) {
      handleResetText();
      return;
    }

    onApprove(text);
  };

  return (
    <SwapComponents
      shouldCallAfterClickOutside={handleResetText}
      shouldCallAfterApprove={handleSubmit}
      render={({ shouldSwap, handleSwap }) =>
        shouldSwap ? (
          <Input
            autoFocusOnMount
            value={text}
            variant="standard"
            onChange={handleChangeText}
          />
        ) : (
          children(handleSwap)
        )
      }
    />
  );
};
