import { FunctionalComponent } from 'preact';
import styles from './App.module.scss';
import { CreativeCorner, Greeting } from './pieces';

export const App: FunctionalComponent = () => {
  return (
    <div class={styles.app}>
      <CreativeCorner />

      <section class={styles.content}>
        <Greeting />
      </section>
    </div>
  );
};
