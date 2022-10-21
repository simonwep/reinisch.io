import { FunctionalComponent } from 'preact';
import { BackToTopButton, CreativeCorner, Cursor, DynamicBackground } from './components';
import styles from './Fixtures.module.scss';

export const Fixtures: FunctionalComponent = () => (
  <div className={styles.fixtures}>
    <DynamicBackground />
    <CreativeCorner />
    <BackToTopButton />
    <Cursor />
  </div>
);
