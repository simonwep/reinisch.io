import { usePageSegmentOffset } from '@hooks';
import { step } from '@utils/math';
import { FunctionalComponent } from 'preact';
import styles from './DynamicBackground.module.scss';

export const DynamicBackground: FunctionalComponent = () => {
  const offset = usePageSegmentOffset();

  return (
    <div
      class={styles.dynamicBackground}
      style={{
        '--offset': step(offset, 0, 0.5),
      }}
    />
  );
};
