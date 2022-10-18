import { PageSegmentContext } from '@components';
import { step } from '@utils/math';
import { scrollTop } from '@utils/scrolling';
import { useContext } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';

interface Options {
  factor?: number;
  range?: [number, number];
}

export const usePageSegmentOffset = (options?: Options) => {
  const segment = useContext(PageSegmentContext);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let frame = -1;

    const update = () => {
      if (frame !== -1) return;

      frame = requestAnimationFrame(() => {
        if (!document.scrollingElement) return;
        const { clientHeight, scrollHeight, scrollTop } = document.scrollingElement;
        const percentage = scrollTop ? scrollTop / (scrollHeight - clientHeight) : 0;
        const newOffset = step(percentage, segment.offset, segment.offset + segment.length);
        const [start, end] = options?.range ?? [0, 1];
        setOffset(step(newOffset, start, end));
        frame = -1;
      });
    };

    window.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(frame);
    };
  }, [segment, options?.range]);

  return offset * (options?.factor ?? 1);
};

export const usePageSegmentControls = () => {
  const segment = useContext(PageSegmentContext);

  const top = () => scrollTop(0);
  const next = () => segment.next && scrollTop(segment.next * window.innerHeight);

  return { top, next };
};
