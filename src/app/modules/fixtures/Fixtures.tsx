import { usePointerDevice } from '@hooks';
import { FunctionalComponent } from 'preact';
import { CreativeCorner, Cursor, DynamicBackground } from './components';
import styles from './Fixtures.module.scss';

export const Fixtures: FunctionalComponent = () => {
  const pointerDevice = usePointerDevice();

  return (
    <div className={styles.fixtures}>
      <DynamicBackground />
      <CreativeCorner />
      {pointerDevice !== 'coarse' && <Cursor />}
    </div>
  );
};
