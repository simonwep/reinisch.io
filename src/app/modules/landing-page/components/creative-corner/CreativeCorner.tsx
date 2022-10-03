import { FunctionalComponent } from 'preact';
import styles from './CreativeCorner.module.scss';

export const CreativeCorner: FunctionalComponent = () => {
  return (
    <div class={styles.creativeCorner} title="Creative developer">
      <span>
        Cr<span>e</span>ative
      </span>
      <span>
        D<span>e</span>veloper
      </span>
    </div>
  );
};
