import { useState } from 'react';
import { toast } from 'react-toastify';

export const useCopyToClipboard = (): [
  boolean,
  (text: string) => Promise<void>,
] => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

  return [isCopied, copyToClipboard];
};
