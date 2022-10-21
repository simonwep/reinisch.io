import { useEffect, useState } from 'preact/hooks';

export interface ScreenSize {
  width: number;
  height: number;
}

export const useScreenSize = () => {
  const [size, setSize] = useState<ScreenSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const update = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return size;
};
