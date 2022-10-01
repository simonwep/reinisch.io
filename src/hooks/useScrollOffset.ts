import { useEffect, useState } from 'preact/hooks';

export interface ScrollOffsetOptions {
  factor?: number;
}

export const useScrollOffset = (options?: ScrollOffsetOptions) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!document.scrollingElement) return;
      const { clientHeight, scrollHeight, scrollTop } = document.scrollingElement;
      setProgress(scrollTop ? scrollTop / (scrollHeight - clientHeight) : 0);
    };

    window.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return progress * (options?.factor ?? 1);
};
