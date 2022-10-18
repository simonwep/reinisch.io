import { Button } from '@components';
import { step } from '@utils/math';
import { FunctionalComponent } from 'preact';
import { usePageSegmentControls, usePageSegmentOffset } from '@hooks';
import styles from './BackToTopButton.module.scss';

export const BackToTopButton: FunctionalComponent = () => {
  const offset = usePageSegmentOffset();
  const controls = usePageSegmentControls();

  return (
    <div
      class={styles.backToTopButton}
      style={{
        '--step-1': step(offset, 0, 0.25),
        '--step-2': step(offset, 0.5, 0.75),
        '--step-3': step(offset, 0.75),
      }}
    >
      <div class={styles.line} />
      <Button className={styles.button} onClick={controls.top}>
        <span class={styles.text}>BACK</span>
      </Button>
    </div>
  );
};
