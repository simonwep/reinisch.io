import { usePageSegmentControls, usePageSegmentOffset, useScreenSize } from '@hooks';
import { FunctionalComponent } from 'preact';
import { AutoFontSize, Button, FullShadow } from '@components';
import { useTypingAnimation } from '@hooks';
import styles from './Greeting.module.scss';

const phrases: string[] = ['Simon :)', 'a Frontent Magician', 'a Fullstack Wizard', 'an Open Sourcerer'];

export const Greeting: FunctionalComponent = () => {
  const phrase = useTypingAnimation(phrases);
  const offset = usePageSegmentOffset();
  const controls = usePageSegmentControls();
  const screenSize = useScreenSize();

  return (
    <div className={styles.greeting} style={{ '--offset': offset }}>
      <FullShadow className={styles.header} shadowClassName={styles.shadow} is="header">
        <h1 className={styles.title}>&lt;Hi!&#47;&gt;</h1>
        <AutoFontSize className={styles.subTitle} is="h2" maxFontSize={screenSize.width / 25}>
          <span>I&apos;m {phrase}</span>
          <span className={styles.cursor}>_</span>
        </AutoFontSize>
      </FullShadow>

      <div class={styles.nextButtonWrapper}>
        <Button className={styles.nextButton} onClick={controls.next}>
          NEXT &gt;&gt;&gt; PROJECTS
        </Button>
      </div>
    </div>
  );
};
