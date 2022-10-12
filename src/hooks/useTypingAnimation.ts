import { createTicks } from '@utils/ticks';
import { useEffect, useState } from 'preact/hooks';

export const useTypingAnimation = (phrases: string[]) => {
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;

    const cleanup = createTicks(() => {
      const phrase = phrases[phraseIndex];
      let delayNext = false;

      setPhrase(phrase.slice(0, charIndex));
      charIndex++;

      if (charIndex > phrase.length) {
        charIndex = 0;
        phraseIndex++;
        delayNext = true;
      }

      if (phraseIndex > phrases.length - 1) {
        phraseIndex = 0;
        delayNext = true;
      }

      return delayNext ? [2000, 2500] : undefined;
    }, [50, 75]);

    return () => {
      cleanup();
      setPhrase('');
    };
  }, [phrases]);

  return phrase;
};
