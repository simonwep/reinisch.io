import { FunctionalComponent } from 'preact';
import styles from './App.module.scss';
import { LandingPage } from './modules';

export const App: FunctionalComponent = () => {
  return (
    <div class={styles.app} id="top">
      <LandingPage />
      <div style="height: 200vh" />
    </div>
  );
};
