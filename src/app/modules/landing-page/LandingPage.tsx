import { FunctionalComponent } from 'preact';
import { DynamicBackground, BackToTopButton, CreativeCorner, Greeting } from './components';
import styles from './LandingPage.module.scss';

export const LandingPage: FunctionalComponent = () => {
  return (
    <section class={styles.landingPage}>
      <div class={styles.content}>
        <DynamicBackground />
        <CreativeCorner />
        <BackToTopButton />
        <Greeting />
      </div>
    </section>
  );
};
