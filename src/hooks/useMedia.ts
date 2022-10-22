import { useEffect, useState } from 'preact/hooks';

export type PointerDevice = 'coarse' | 'fine' | 'both';

const hasCoarsePointer = () => window.matchMedia('(pointer: coarse)').matches;
const hasFinePointer = () => window.matchMedia('(pointer: fine)').matches;

export const usePointerDevice = (): PointerDevice => {
  const [pointerDevice, setPointerDevice] = useState<PointerDevice>('coarse');

  useEffect(() => {
    const change = () => {
      const coarse = hasCoarsePointer();
      const fine = hasFinePointer();
      setPointerDevice(coarse && fine ? 'both' : fine ? 'fine' : 'coarse');
    };

    const coarseQuery = window.matchMedia('(pointer: coarse)');
    const fineQuery = window.matchMedia('(pointer: fine)');

    coarseQuery.addEventListener('change', change);
    fineQuery.addEventListener('change', change);

    change();

    return () => {
      coarseQuery.removeEventListener('change', change);
      fineQuery.removeEventListener('change', change);
    };
  }, []);

  return pointerDevice;
};
