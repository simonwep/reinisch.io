import { FunctionalComponent } from 'preact';
import styles from './App.module.scss';
import { CreativeCorner, Greeting, BackToTopButton } from './pieces';

export const App: FunctionalComponent = () => {
  return (
    <div class={styles.app} id="top">
      <CreativeCorner />
      <BackToTopButton />

      <section class={styles.content}>
        <Greeting />
        <div style="height: 200vh" />
      </section>
    </div>
  );
};
