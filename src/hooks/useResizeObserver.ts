import { useLayoutEffect, useState } from 'preact/hooks';

export const useResizeObserver = (el: HTMLElement | undefined | null) => {
  const [size, setSize] = useState<DOMRect>();

  useLayoutEffect(() => {
    const element = el;
    let observer: ResizeObserver | undefined;

    if (element) {
      setSize(element.getBoundingClientRect());
      observer = new ResizeObserver(() => setSize(element.getBoundingClientRect()));
      observer.observe(element);
    }

    return () => observer?.disconnect();
  }, [el]);

  return size;
};
