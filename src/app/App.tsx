import { FunctionalComponent } from 'preact';
import styles from './App.module.scss';
import { LandingPage } from './modules';

const ANIMATION_LENGTH = 2;

export const App: FunctionalComponent = () => (
  <div className={styles.app} style={`height: ${ANIMATION_LENGTH * 100}vh`} id="top">
    <div class={styles.content}>
      <LandingPage />
    </div>
  </div>
);
