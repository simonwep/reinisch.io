import { usePageSegmentOffset } from '@hooks';
import { createTicks } from '@utils/ticks';
import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { AutoFontSize, FullShadow } from '@components';
import styles from './Greeting.module.scss';

const phrases: string[] = ['Simon :)', 'a Frontent Magician', 'a Fullstack Wizard', 'an Open Sourcerer'];

export const Greeting: FunctionalComponent = () => {
  const [phrase, setPhrase] = useState('');
  const offset = usePageSegmentOffset();

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;

    return createTicks(() => {
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
  }, []);

  return (
    <div className={styles.greeting} style={{ '--offset': offset }}>
      <FullShadow className={styles.header} shadowClassName={styles.shadow} is="header">
        <h1 className={styles.title}>&lt;Hi!&#47;&gt;</h1>
        <AutoFontSize class={styles.subTitle} is="h2" maxFontSize={68} factor={1.4}>
          I&apos;m {phrase}
          <span className={styles.cursor}>_</span>
        </AutoFontSize>
      </FullShadow>
    </div>
  );
};
