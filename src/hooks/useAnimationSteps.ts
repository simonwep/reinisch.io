import { useEffect, useState } from 'preact/hooks';

export const useAnimationSteps = (durations: number[]) => {
  const [step, setStep] = useState(-1);
  const [active, setActive] = useState(false);

  const stop = () => {
    setStep(-1);
    setActive(false);
  };

  const start = () => {
    setStep(0);
    setActive(true);
  };

  useEffect(() => {
    if (step === -1) return;
    const next = step + 1;

    if (next > durations.length) {
      stop();
      return;
    }

    const timeout = setTimeout(() => {
      if (next + 1 > durations.length) {
        stop();
      } else {
        setStep(next);
      }
    }, durations[next - 1]);

    return () => clearTimeout(timeout);
  }, [step, active, durations]);

  return { active, step, start, stop };
};
