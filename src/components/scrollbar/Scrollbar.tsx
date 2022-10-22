import { FunctionalComponent } from 'preact';
import { Button } from '../button/Button';
import styles from './Scrollbar.module.scss';

export const Scrollbar: FunctionalComponent = () => {
  return (
    <div class={styles.scrollbar}>
      <div class={styles.bar}>
        <div class={styles.knob} />
      </div>

      <Button className={styles.backButton} title="Back to top">
        <span className={styles.text}>&lt;&lt;&lt; BACK</span>
      </Button>
    </div>
  );
};
