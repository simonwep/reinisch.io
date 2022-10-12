import { usePageSegmentControls, usePageSegmentOffset } from '@hooks';
import { FunctionalComponent } from 'preact';
import { AutoFontSize, Button, FullShadow } from '@components';
import { useTypingAnimation } from '@hooks';
import styles from './Greeting.module.scss';

const phrases: string[] = ['Simon :)', 'a Frontent Magician', 'a Fullstack Wizard', 'an Open Sourcerer'];

export const Greeting: FunctionalComponent = () => {
  const phrase = useTypingAnimation(phrases);
  const offset = usePageSegmentOffset();
  const controls = usePageSegmentControls();

  return (
    <div className={styles.greeting} style={{ '--offset': offset }}>
      <FullShadow className={styles.header} shadowClassName={styles.shadow} is="header">
        <h1 className={styles.title}>&lt;Hi!&#47;&gt;</h1>
        <AutoFontSize class={styles.subTitle} is="h2" maxFontSize={68} factor={1.4}>
          I&apos;m {phrase}
          <span className={styles.cursor}>_</span>
        </AutoFontSize>
      </FullShadow>

      <Button className={styles.nextButton} onClick={controls.next}>
        NEXT /// PROJECTS
      </Button>
    </div>
  );
};
