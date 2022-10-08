import { FunctionalComponent } from 'preact';
import { BackToTopButton, CreativeCorner, DynamicBackground, Greeting } from './components';
import styles from './LandingPage.module.scss';

export const LandingPage: FunctionalComponent = () => {
  return (
    <section class={styles.landingPage}>
      <DynamicBackground />
      <CreativeCorner />
      <BackToTopButton />
      <Greeting />
    </section>
  );
};
